// src/components/AdminDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import useAuthStore from "../Stores/AuthStore";
import { FaBackspace } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const AdminChatSupportPage = () => {
  const navigate = useNavigate();
  const [connection, setConnection] = useState(null);
  const [customers, setCustomers] = useState([]); 
  const [connectedIds, setConnectedIds] = useState([]); 
  const [selectedCustomer, setSelectedCustomer] = useState(null); 
  const [messages, setMessages] = useState({}); 
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState({});
  const messagesEndRef = useRef(null);

 const { token, UserId } = useAuthStore.getState();
 if (token) {
   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
 }

 // SignalR connection
 useEffect(() => {
   if (!token) return;

   const conn = new signalR.HubConnectionBuilder()
     .withUrl(`${BASE_URL}/chathub?access_token=${token}`)
     .withAutomaticReconnect()
     .configureLogging(signalR.LogLevel.Warning)
     .build();

   // Listen for customer connection updates
   conn.on("CustomerList", (connectedIdsList) => {
     setConnectedIds(connectedIdsList || {});
   });

   // Listen for incoming messages
   conn.on("ReceiveMessage", (senderId, receiverId, senderType, message) => {
     const customerId = senderType === "customer" ? senderId : receiverId;

     setMessages((prev) => ({
       ...prev,
       [customerId]: [
         ...(prev[customerId] || []),
         {
           senderId,
           senderType,
           messageText: message,
           timestamp: new Date().toISOString(),
         },
       ],
     }));

     // Increment unread count if customer not currently selected
     setSelectedCustomer((prevSel) => {
       if (prevSel !== customerId) {
         setUnread((u) => {
           const nextCount = (u[customerId] || 0) + 1;
           // Save immediately to backend
           axios.post(`${BASE_URL}/api/UnreadMessages`, {
               senderId: customerId,
               unreadCount: nextCount,
             })

             .catch(console.error);
           return { ...u, [customerId]: nextCount };
         });
       }
       return prevSel;
     });
   });

   // Start connection
   conn
     .start()
     .then(() => {
       console.log("✅ Admin SignalR connected");
       setConnection(conn);
     })
     .catch((err) => console.error("❌ SignalR connection error:", err));

   return () => conn.stop();
 }, [token]);

 // Fetch all customers
 useEffect(() => {
   const loadUsers = async () => {
     try {
       const res = await axios.get(`${BASE_URL}/api/AdminChat/users`);
       setCustomers(res.data);
     } catch (err) {
       console.error("Failed to load users:", err);
     }
   };
   loadUsers();
 }, [messages]);

 // Fetch unread counts on page load
 useEffect(() => {
   if (!UserId) return;

   const fetchUnread = async () => {
     console.log("running get")
     try {
       const res = await axios.get(
         `${BASE_URL}/api/UnreadMessages/Admin/${UserId}`
       );
       const unreadData = res.data.reduce((acc, item) => {
         acc[item.senderId] = item.unreadCount;
         return acc;
       }, {});
       setUnread(unreadData);
     } catch (err) {
       console.error("Failed to fetch admin unread counts:", err);
     }
   };

   fetchUnread();
 }, [useAuthStore((s) => s.UserId)]);

 // Load chat history for selected customer
 useEffect(() => {
   if (!selectedCustomer) return;

   const loadHistory = async () => {
     try {
       const res = await axios.get(
         `${BASE_URL}/api/AdminChat/history/${selectedCustomer}`
       );
       
       setMessages((prev) => ({
         ...prev,
         [selectedCustomer]: res.data.map((m) => ({
           senderId: m.senderId,
           senderType: m.senderId == UserId ? "admin" : "customer",
           messageText: m.messageText,
           timestamp: m.timestamp,
         })),
       }));

       // Clear unread for this customer
       setUnread((prev) => ({ ...prev, [selectedCustomer]: 0 }));

       // Save cleared unread count to backend
       await axios.post(`${BASE_URL}/api/UnreadMessages`, {
         senderId: selectedCustomer,
         unreadCount: 0,
       });
     } catch (err) {
       console.error("Failed to load history:", err);
     }
   };

   loadHistory();
 }, [selectedCustomer, UserId]);

 // Scroll to bottom
 useEffect(() => {
   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
 }, [messages, selectedCustomer]);

 // Handle sending a message
 const handleSend = async () => {
   if (!input.trim() || !connection || !selectedCustomer) return;

   try {
     await connection.invoke("SendToCustomer", selectedCustomer, input);

     setMessages((prev) => ({
       ...prev,
       [selectedCustomer]: [
         ...(prev[selectedCustomer] || []),
         {
           senderId: "admin",
           senderType: "admin",
           messageText: input,
           timestamp: new Date().toISOString(),
         },
       ],
     }));
     setInput("");
   } catch (err) {
     console.error("Send failed:", err);
   }
 };

 const handleSelectCustomer = (id) => {
   setSelectedCustomer(id);
 };

 const getName = (id) => {
   const u = customers.find((c) => c.userId === id);
   return u ? u.name : `User ${id}`;
 };

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Sidebar */}
          <div
            className="col-md-3 border-end"
            style={{ height: "80vh", overflowY: "auto" }}
          >
            <h5 className="p-3 bg-success text-white">Customers</h5>

            <ul className="list-group list-group-flush">
              {customers.map((c) => {
                const idsArray = Object.keys(connectedIds).map(Number);
                const isOnline = idsArray.includes(c.userId);
                const unreadCount = unread[c.userId] || 0;
                return (
                  <li
                    key={c.userId}
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      selectedCustomer === c.userId ? "bg-success" : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSelectCustomer(c.userId)}
                  >
                    <div>
                      <div className="fw-bold">{c.name}</div>
                      {isOnline && (
                        <span className="badge text-secondary">online</span>
                      )}
                    </div>
                    <div>
                      {unreadCount > 0 && (
                        <span className="badge text-success fw-bold me-2">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Chat panel */}
          <div
            className="col-md-9 d-flex flex-column"
            style={{ height: "80vh" }}
          >
            {selectedCustomer && (
              <h5 className="position-fixed p-3 ms-0 bg-secondary w-100 text-white">
                {getName(selectedCustomer)}
              </h5>
            )}
            <div
              className="flex-grow-1 p-3 pt-0 overflow-auto mt-5"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              {selectedCustomer ? (
                <>
                  <div className="mt-3">
                    {(messages[selectedCustomer] || []).map((m, idx) => {
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
      <button
        className="btn text-start d-flex align-items-center justify-content-between p-3 border-0 rounded btn-outline-light text-dark"
        onClick={() => {
          navigate("/FruitsWallahAdmin");
        }}
      >
        <div className="d-flex align-items-center gap-3 fw-medium" >
          <FaBackspace size={20} />
            Back to DashBoard
         
        </div>
      </button>

    </>
  );
};

export default AdminChatSupportPage;
