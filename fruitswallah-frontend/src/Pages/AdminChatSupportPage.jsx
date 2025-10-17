// src/components/AdminDashboard.jsx
import React, { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import useAuthStore from "../Stores/AuthStore";
import { FaBackspace } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./AdminChatSupportPage.css";

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
  const [searchTerm, setSearchTerm] = useState('');
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
           axios
             .post(
               `${BASE_URL}/api/UnreadMessages`,
               {
                 senderId: customerId,
                 unreadCount: nextCount,
               },
               {
                 headers: {
                   Authorization: `Bearer ${token}`,
                 },
               }
             )

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
       setConnection(conn);
     })
     .catch((err) => console.error("❌ SignalR connection error:", err));

   return () => conn.stop();
 }, [token]);

 // Fetch all customers
 useEffect(() => {
   const loadUsers = async () => {
     try {
       const res = await axios.get(`${BASE_URL}/api/AdminChat/users`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
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
   
     try {
       const res = await axios.get(
         `${BASE_URL}/api/UnreadMessages/Admin/${UserId}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
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
         `${BASE_URL}/api/AdminChat/history/${selectedCustomer}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
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
       await axios.post(
         `${BASE_URL}/api/UnreadMessages`,
         {
           senderId: selectedCustomer,
           unreadCount: 0,
         },
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
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

 const filteredCustomers = customers.filter(customer =>
  customer.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="admin-chat-container">
          <div className="chat-sidebar">
            <div className="sidebar-header">
              <div>
                <div style={{fontWeight:700}}>Customers</div>
                <div style={{fontSize:12,opacity:0.9}}>Support queue</div>
              </div>
            </div>

            <div className="sidebar-search">
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <FiSearch />
                <input placeholder="Search customers..." onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="customer-list">
              {filteredCustomers.map((c) => {
                const idsArray = Object.keys(connectedIds).map(Number);
                const isOnline = idsArray.includes(c.userId);
                const unreadCount = unread[c.userId] || 0;
                return (
                  <div
                    key={c.userId}
                    className={`customer-item ${selectedCustomer === c.userId ? 'selected':''}`}
                    onClick={() => handleSelectCustomer(c.userId)}
                  >
                    <div className="avatar">{(c.name || 'U').slice(0,1)}</div>
                    <div className="customer-meta">
                      <div className="d-flex align-items-center">
                        <div className="customer-name">{c.name}</div>
                        {isOnline && <span className="badge-online" />}
                      </div>
                      <div className="customer-sub">{c.email || 'Customer'}</div>
                    </div>
                    <div>
                      {unreadCount > 0 && (
                        <div className="unread-badge">{unreadCount}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="chat-panel">
            <div className="chat-header">
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div className="avatar" style={{width:48,height:48}}>{selectedCustomer? (getName(selectedCustomer)||'U').slice(0,1):'A'}</div>
                <div>
                  <div className="title">{selectedCustomer ? getName(selectedCustomer) : 'Select a customer'}</div>
                  <div style={{fontSize:12,color:'#6b7280'}}>{selectedCustomer? 'Active chat' : 'No conversation selected'}</div>
                </div>
              </div>
              <div style={{marginLeft:'auto'}}>
                {selectedCustomer && (
                  <button className="btn btn-sm btn-outline-secondary" onClick={()=>setSelectedCustomer(null)}><ImCross /></button>
                )}
              </div>
            </div>

            <div className="chat-messages">
              {selectedCustomer ? (
                (messages[selectedCustomer] || []).map((m, idx) => {
                  const isAdmin = m.senderType === 'admin' || m.senderId === 'admin';
                  return (
                    <div key={idx} className={`msg-row ${isAdmin? 'right':''}`}>
                      <div className={`msg-bubble ${isAdmin? 'admin':'customer'}`}>
                        <div>{m.messageText}</div>
                        <div className="msg-meta">{new Date(m.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center text-muted mt-5">Select a customer to view chat</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {selectedCustomer && (
              <div className="composer">
                <input
                  type="text"
                  placeholder="Type a reply..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button className="btn-send" onClick={handleSend}>Send</button>
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
        <div className="d-flex align-items-center gap-3 fw-medium">
          <FaBackspace size={20} />
          Back to DashBoard
        </div>
      </button>
    </>
  );
};

export default AdminChatSupportPage;
