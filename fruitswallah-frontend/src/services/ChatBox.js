import axios from "axios";
import useAuthStore from "../Stores/AuthStore";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const PostUnreadCount = async (unreadCount, setUnread) => {
  const { UserId } = useAuthStore.getState();
  const Payload = {
    senderId: parseInt(UserId),
    unreadCount: unreadCount,
  };

  const res = await axios.post(`${BASE_URL}/api/UnreadMessages/User`, Payload);
  console.log(res.data);
  setUnread(res.data.unreadCount);
};

export const GetUnread = async (setUnread) => {
    const { UserId } = useAuthStore.getState();
    
  const res = await axios.get(`${BASE_URL}/api/UnreadMessages/${UserId}`);
  setUnread(res.data);
  console.log(res.data);
};