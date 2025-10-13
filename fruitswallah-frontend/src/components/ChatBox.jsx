import React, { useEffect, useRef, useState } from 'react'
import * as signalR from "@microsoft/signalr";
import useAuthStore from '../Stores/AuthStore';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const ChatBox = () => {

    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const { token } = useAuthStore.getState();
        
        if (!token) return;

        const conn = new signalR.HubConnectionBuilder()
          .withUrl(`https://localhost:7293/chathub?access_token=${token}`) // Change to your backend URL
          .withAutomaticReconnect()
          .build();

        conn.start()
            .then(() => {
                console.log("✅ Connected to chat hub");
                setConnection(conn);
            })
            .catch((err) => console.error("SignalR connection error:", err));

        // Receive message from admin
        conn.on("ReceiveMessage", (senderId, receiverId, senderType, message) => {
            setMessages((prev) => [
              ...prev,
              { senderType, messageText: message },
            ]);

            // If widget is closed, count as unread
            if (!isOpen && senderType !== "customer") {
                setUnreadCount((prev) => prev + 1);
            }
        });

        return () => conn.stop();
    }, [isOpen]);

    // Auto-scroll when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // ✅ Send message to support
    const sendMessage = async () => {
        if (msg.trim() !== "" && connection) {
            try {
                await connection.invoke("SendToSupport", msg);
                setMessages((prev) => [
                  ...prev,
                  { senderType: "customer", messageText: msg },
                ]);
                setMsg("");
            } catch (err) {
                console.error("Send message error:", err);
            }
        }
    };

    // ✅ Toggle widget open/close
    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setUnreadCount(0);
    };
    useEffect(() => {
        const { token, UserId } = useAuthStore.getState();
        const loadHistory = async () => {
            try {
                const res = await axios.get(
                    `${BASE_URL}/api/AdminChat/UserHistroy/${UserId}`
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
                        className="btn btn-primary rounded-circle shadow position-relative"
                        style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "24px",
                        }}
                        onClick={toggleChat}
                    >
                        💬
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
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Customer Support</h6>
                        <button className="btn btn-sm btn-light" onClick={toggleChat}>
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
                                className={`d-flex mb-2 ${m.senderType === "customer"
                                        ? "justify-content-end"
                                        : "justify-content-start"
                                    }`}
                            >
                                <div
                                    className={`p-2 rounded ${m.senderType === "customer"
                                            ? "bg-primary text-white"
                                            : "bg-light border"
                                        }`}
                                    style={{ maxWidth: "75%" }}
                                >
                                    {m.messageText}
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
                        <button className="btn btn-primary" onClick={sendMessage}>
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

    export default ChatBox;
