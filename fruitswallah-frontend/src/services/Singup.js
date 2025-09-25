import axios from "axios";
import jwt_decode from "jwt-decode";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const handleSignUp = async (data, navigate, setData) => {
  const { Username, Email, PhoneNumber, Password, cpassword } = data;
  if (!Username || !Email || !PhoneNumber || !Password || !cpassword) {
    alert("Please fill all fields");
    return;
  } else if (Password.length < 6) {
    alert("Password must be at least 6 characters long");
    return;
  } else if (Password !== cpassword) {
    alert("Passwords do not match");
    return;
  } else {
    try{
    const res = await axios.post(`${BASE_URL}/api/Users`, data);
    setData({
      Username: "",
      Email: "",
      PhoneNumber: "",
      Password: "",
      cpassword: "",
    })
      localStorage.setItem("Token", res.data)
      const decode = jwt_decode(res.data);
      const userid = decode.UserId;
      localStorage.setItem("UserId", userid);
    navigate("/home", {
      state: {
        message: "Your Account Created Successfully...",
        Username: Username,
        comingFrom: "signup",
      },
    });
  }
    catch (e) {
      console.log(e.response.data)
    return;
  }
    
  }
};


