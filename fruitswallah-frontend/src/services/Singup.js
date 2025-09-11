import axios from "axios";


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
    const res = await axios.post("https://localhost:7293/api/Users", data);
    if (res.data.userId) {
      setData({
        Username: "",
        Email: "",
        PhoneNumber: "",
        Password: "",
        cpassword: "",
      });
      localStorage.setItem('isLogin', true);
      localStorage.setItem('UserId', res.data.userId);
      localStorage.setItem('isAdmin', res.data.isAdmin);
      navigate("/home", {
        state: {
          message: "Your Account Created Successfully...",
          Username: Username,
          comingFrom: "signup",
        },
      });
    }
    else {
      alert(res.data)
      return;
    }
  }
};


