import axios from "axios";
import useAuthStore from "../Stores/AuthStore";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getAddress = async (setAddresses) => {
  const { token, UserId } = useAuthStore.getState();
  const res = await axios.get(`${BASE_URL}/api/Addresses/${UserId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.data) {
    setAddresses(res.data);
    return res.data
  }
};

export const addAddress = async (data, setAddresses, setShowPopup) => {
  const { token,UserId } = useAuthStore.getState();
  const { PhoneNumber, PostalCode } = data; 
  
  if (UserId == null) {
    alert("Please login to add address");
    return;
  } else if (PostalCode.toString().length != 6) {
    alert("Pincode must be 6 Digit");
    return;
  } else if (PhoneNumber.toString().length != 10) {
    alert("Phone Number must be 10 Digit");
    return;
  }
  data.UserId = UserId;
  try {
    const res = await axios.post(`${BASE_URL}/api/Addresses`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await getAddress(setAddresses);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: true, message: res.data};
  } catch (e) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: false, message: e.response.data };
  }
};

export const handleDeleteAddress = async (AddId, setAddresses, setShowPopup) => {
  const { token } = useAuthStore.getState();

  try {
    const res = await axios.delete(`${BASE_URL}/api/Addresses/${AddId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    await getAddress(setAddresses);
    return { status: false, message: res.data };
  }
  catch (e) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: false, message: e.response.data };
  }
};

export const makePrimary = async (address, setAddresses, setShowPopup) => {
  const { token } = useAuthStore.getState();
  try {
    address.isPrimary = true;
    const res = await axios.put(
      `${BASE_URL}/api/Addresses/${address.addId}`,
      address,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await getAddress(setAddresses);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: true, message: res.data };
  } catch (e) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return { status: false, message: e.response.data };
  }
};