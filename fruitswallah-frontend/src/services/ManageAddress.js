import axios from "axios";
const UserId = localStorage.getItem("UserId");
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getAddress = async (setAddresses) => {
  const res = await axios.get(`${BASE_URL}/api/Addresses/${UserId}`);
  if (res.data) {
    setAddresses(res.data);
  }
};

export const addAddress = async (data, setAddresses, setShowPopup) => {
  const { UserId, PhoneNumber, PostalCode } = data;
  if (UserId == null) {
    return;
  } else if (PostalCode.toString().length != 6) {
    alert("Pincode must be 6 Digit");
    return;
  } else if (PhoneNumber.toString().length != 10) {
    alert("Phone Number must be 10 Digit");
    return;
  }
  const res = await axios.post(`${BASE_URL}/api/Addresses`, data);
  await getAddress(setAddresses);
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
  return { status: true,message:"Address Added successfully" };
};

export const handleDeleteAddress = async (AddId, setAddresses, setShowPopup) => {
  const res = await axios.delete(
    `${BASE_URL}/api/Addresses/${AddId}`
  );
  setShowPopup(true);
  setTimeout(() => {
    setShowPopup(false);
  }, 2000);
  await getAddress(setAddresses);
  return { status: false, message: "Address Deleted Successfully" };
};

export const makePrimary = async (address, setAddresses) => {
  address.isPrimary = true;
  const res = await axios.put(
    `${BASE_URL}/api/Addresses/${address.addId}`,
    address
  );
  await getAddress(setAddresses);
  
  return {status: true};
};