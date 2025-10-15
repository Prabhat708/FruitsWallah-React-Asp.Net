import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import useAuthStore from "../Stores/AuthStore";
import axios from "axios";
import { BsChatText } from "react-icons/bs";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ChatBox = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const firstRender = useRef(true); // used to skip first unreadCount effect run
  const { token } = useAuthStore.getState();
  // ✅ Setup SignalR connection
  useEffect(() => {
    const { token } = useAuthStore.getState();
    if (!token) return;

    const conn = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}/chathub?access_token=${token}`)
      .withAutomaticReconnect()
      .build();

    conn
      .start()
      .then(() => {
        console.log("✅ Connected to chat hub");
        setConnection(conn);
      })
      .catch((err) => console.error("SignalR connection error:", err));

    // ✅ Receive message from admin
    conn.on(
      "ReceiveMessage",
      (senderId, receiverId, senderType, message, timestamp) => {
        setMessages((prev) => [
          ...prev,
          { senderType, messageText: message, timestamp },
        ]);

        // If widget is closed, increment unread count
        if (!isOpen && senderType !== "customer") {
          setUnreadCount((prev) => prev + 1);
        }
      }
    );

    return () => conn.stop();
  }, [isOpen]);

  // ✅ Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message to admin
  const sendMessage = async () => {
    if (msg.trim() !== "" && connection) {
      try {
        await connection.invoke("SendToSupport", msg);
        setMessages((prev) => [
          ...prev,
          { senderType: "customer", messageText: msg, timestamp: new Date() },
        ]);
        setMsg("");
      } catch (err) {
        console.error("Send message error:", err);
      }
    }
  };


useEffect(() => {
  const { UserId } = useAuthStore.getState();

  if (!UserId || UserId === "null" || UserId === null) {
    return; 
  }

  const fetchUnread = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/UnreadMessages/${UserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUnreadCount(res.data || 0);
      
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  fetchUnread();
}, [useAuthStore((s) => s.UserId)]);


  // ✅ Update unread count on server only when it changes (skip first run)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return; 
    }

    const { UserId } = useAuthStore.getState();
    const updateUnread = async () => {
      try {
        await axios.post(
          `${BASE_URL}/api/UnreadMessages/User`,
          {
            senderId: parseInt(UserId),
            unreadCount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Failed to update unread count:", err);
      }
    };

    updateUnread();
  }, [unreadCount]);

  // ✅ Fetch chat history when widget opens
  useEffect(() => {
    if (!isOpen) return;

    const { UserId } = useAuthStore.getState();
    const loadHistory = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/AdminChat/UserHistroy/${UserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(
          res.data.map((m) => ({
            senderId: m.senderId,
            senderType: m.senderId == UserId ? "customer" : "admin",
            messageText: m.messageText,
            timestamp: m.timestamp,
          }))
        );
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };

    loadHistory();
  }, [isOpen]);

  // ✅ Toggle chat visibility
  const toggleChat = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        setUnreadCount(0); // mark as read when opening
      }
      return newState;
    });
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <div
          className="position-fixed"
          style={{
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <button
            className="btn btn-success rounded-circle shadow position-relative d-flex align-items-center justify-content-center"
            style={{
              width: "60px",
              height: "60px",
              fontSize: "24px",
            }}
            onClick={toggleChat}
          >
            <BsChatText />
            {unreadCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "12px" }}
              >
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Chat Box Window */}
      {isOpen && (
        <div
          className="card shadow-lg position-fixed d-flex flex-column"
          style={{
            bottom: "20px",
            right: "20px",
            width: "350px",
            height: "500px",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h6 className="mb-0">Customer Support</h6>
            <button className="btn" onClick={toggleChat}>
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div
            className="card-body overflow-auto flex-grow-1"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            {messages.length === 0 && (
              <p className="text-muted text-center mt-5">
                Start chatting with support 👋
              </p>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${
                  m.senderType === "customer"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    m.senderType === "customer"
                      ? "bg-success text-white"
                      : "bg-light border"
                  }`}
                  style={{ maxWidth: "75%" }}
                >
                  {m.messageText}
                  <small
                    className="text-muted d-block mt-1"
                    style={{ fontSize: 11 }}
                  >
                    {new Date(m.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </small>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="card-footer d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type your message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="btn btn-success" onClick={sendMessage}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
