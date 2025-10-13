// src/components/AdminDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import useAuthStore from "../Stores/AuthStore";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const HUB_URL = "https://localhost:7293/chathub";

const AdminChatSupportPage = () => {
  const [connection, setConnection] = useState(null);
  const [customers, setCustomers] = useState([]); 
  const [connectedIds, setConnectedIds] = useState([]); 
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const [messages, setMessages] = useState({}); 
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState({});
  const messagesEndRef = useRef(null);

  // axios defaults with token
  const { token, UserId } = useAuthStore.getState();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    // Load all customer accounts for sidebar
    const loadUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/AdminChat/users`);
        setCustomers(res.data);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    };
    loadUsers();

    // Build SignalR connection
    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${HUB_URL}?access_token=${token}`)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    try {
      conn.on("CustomerList", (connectedIdsList) => {
        setConnectedIds(connectedIdsList);
      });
    } catch (e) {
      console.log("can't get", e);
    } finally {
      
    }
    // Handle messages
    conn.on("ReceiveMessage", (senderId, receiverId, senderType, message) => {
      const customerId = senderType === "customer" ? senderId : receiverId;

      setMessages((prev) => {
        const old = prev[customerId] || [];
        const next = [
          ...old,
          {
            senderId,
            messageText: message,
            timestamp: new Date().toISOString(),
          },
        ];
        return { ...prev, [customerId]: next };
      });

      // if not selected customer, mark unread
      setSelectedCustomer((prevSel) => {
        if (prevSel !== customerId) {
          setUnread((u) => ({ ...u, [customerId]: (u[customerId] || 0) + 1 }));
        }
        return prevSel;
      });
    });

    // ✅ Only start connection after listeners are set
    conn
      .start()
      .then(() => {
        console.log("✅ Admin SignalR connected");
        setConnection(conn);
      })
      .catch((err) => console.error("❌ SignalR connection error:", err));

    // Cleanup on unmount
    return () => {
      conn.stop();
    };
  }, []);

  // when selectedCustomer changes, load history and clear unread
  useEffect(() => {
    if (!selectedCustomer) return;

    const loadHistory = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/AdminChat/history/${selectedCustomer}`
        );

        // normalize to messages map
        setMessages((prev) => ({
          ...prev,
          [selectedCustomer]: res.data.map((m) => ({
            senderId: m.senderId,
            senderType: m.senderId == UserId?"admin":"customer",
            messageText: m.messageText,
            timestamp: m.timestamp,
          })),
        }));
        // clear unread
        setUnread((prev) => ({ ...prev, [selectedCustomer]: 0 }));
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };
    loadHistory();
  }, [selectedCustomer]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedCustomer]);

  const handleSelectCustomer = (id) => {
    setSelectedCustomer(id);
  };

  const handleSend = async () => {
    if (!input.trim() || !connection || !selectedCustomer) return;
    try {
      // SignalR method SendToCustomer(int customerId, string message)
      await connection.invoke("SendToCustomer", selectedCustomer, input);
      // optimistic UI update (backend hub also will send ReceiveMessage to caller)

      setMessages((prev) => {
        const old = prev[selectedCustomer] || [];
        const next = [
          ...old,
          {
            senderId: "admin",
            senderType:"admin",
            messageText: input,
            timestamp: new Date().toISOString(),
          },
        ];
        return { ...prev, [selectedCustomer]: next };
      });
      setInput("");
    } catch (err) {
      console.error("Send failed:", err);
    }
  };

  const getName = (id) => {
    const u = customers.find((c) => c.userId === id);
    return u ? u.name : `User ${id}`;
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 border-end"
          style={{ height: "80vh", overflowY: "auto" }}
        >
          <h5 className="p-3 bg-primary text-white">Customers</h5>
          <ul className="list-group list-group-flush">
            {customers.map((c) => {
              const idsArray = Object.keys(connectedIds).map(Number);
              const isOnline = idsArray.includes(c.userId);
              const unreadCount = unread[c.id] || 0;
              return (
                <li
                  key={c.userId}
                  className={`list-group-item d-flex justify-content-between align-items-center ${
                    selectedCustomer === c.userId ? "active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectCustomer(c.userId)}
                >
                  <div>
                    <div className="fw-bold">{c.name}</div>
                  </div>
                  <div>
                    {unreadCount > 0 && (
                      <span className="badge bg-danger me-2">
                        {unreadCount}
                      </span>
                    )}
                    {isOnline && (
                      <span className="badge text-secondary">online</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Chat panel */}
        <div className="col-md-9 d-flex flex-column" style={{ height: "80vh" }}>
          <div
            className="flex-grow-1 p-3 overflow-auto"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            {selectedCustomer ? (
              <>
                <h6>Chat with {getName(selectedCustomer)}</h6>
                <div className="mt-3">
                  {(messages[selectedCustomer] || []).map((m, idx) => {
                    const fromAdmin =
                      m.senderId === "admin" ||
                      m.senderId === parseInt(connection?.connectionId || NaN);

                    const align =
                      m.senderType === "admin"
                        ? "justify-content-end"
                        : "justify-content-start";
                    const bubbleClass =
                      m.senderType === "admin"
                        ? "bg-success text-white"
                        : "bg-light border";
                    return (
                      <div key={idx} className={`d-flex mb-2 ${align}`}>
                        <div
                          className={`p-2 rounded ${bubbleClass}`}
                          style={{ maxWidth: "70%" }}
                        >
                          <div>{m.messageText}</div>
                          <small
                            className="text-muted d-block mt-1"
                            style={{ fontSize: 11 }}
                          >
                            {new Date(m.timestamp).toLocaleString()}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </>
            ) : (
              <div className="text-center text-muted mt-5">
                Select a customer to view chat
              </div>
            )}
          </div>

          {/* Input */}
          {selectedCustomer && (
            <div className="p-3 border-top d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Type a reply..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button className="btn btn-success" onClick={handleSend}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChatSupportPage;
