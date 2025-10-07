import axios from "axios";
import useAuthStore from "../Stores/AuthStore";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getDashboardStats = async () => {
  const { token } = useAuthStore.getState();
  const res = await axios.get(`${BASE_URL}/api/Admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getRevenueData = async () => {
  const { token } = useAuthStore.getState();
  const res = await axios.get(`${BASE_URL}/api/Admin/Revenue`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let num = 0;
  let data = [];
  for (let i = 11; i >= 0; i--){
    if (res.data[i] == 0 && num == 0) {
      data.push(null);
    }
    else if (res.data[i] > 0) {
      num = 1;
      data.push(res.data[i])
    }
    else {
      data.push(res.data[i]);
    }
  }
  data = data.reverse();
  return data;
}