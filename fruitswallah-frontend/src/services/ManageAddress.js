import axios from "axios";

export const getAddress = async (UserId, setAddresses) => {
  const res = await axios.get(`https://localhost:7293/api/Addresses/${UserId}`);
  if (res.data) {
    setAddresses(res.data);
  }
};

export const addAddress = async (data) => {
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
  const res = await axios.post("https://localhost:7293/api/Addresses", data);
  if (res.data) alert(res.data);
};
