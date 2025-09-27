import axios from "axios";
import CryptoJS from "crypto-js";
const _kEY = import.meta.env.VITE_ENCRYPTION_KEY;
const _IV = import.meta.env.VITE_ENCRYPTION_IV;
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const sendOtp = async (email,setBOtp,setIsOtpSent,setLoading) => {
    try {
      const payload = {
        email: email,
      };
      const response = await axios.post(
        `${BASE_URL}/api/OTP`,
        payload
      );
        setBOtp(response.data);
        setIsOtpSent(true);
      return {status:true, message:"OTP Send Successfully!"}
    } catch (e) {
      return {status:false, message:e.response.data}
    } finally {
      setLoading(false);
    }
}


export const VerifyOtp = (encryptedOtp, realOtp) => {
    const key = CryptoJS.enc.Utf8.parse(_kEY);
    const iv = CryptoJS.enc.Utf8.parse(_IV);
    const decrypted = CryptoJS.AES.decrypt(encryptedOtp, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8) == realOtp.toString();
};

export const validateForForgetPassword = async (
  email,
  setLoading,
  setBOtp,
  setIsOtpSent,
  setShowPopup
) => {
  const payload = {
    email:email
  }
  try {
    const res = await axios.post(`${BASE_URL}/api/OTP/forgetPassword`, payload);
    setBOtp(res.data);
    setIsOtpSent(true);
    
   return {status:true,message:"OTP send Successfully!"}
  } catch (e) {
    return { status: false, message: e.response.data };
  } finally {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    setLoading(false);
  }
};

export const SetNewPassword = async (data, email,setShowPopup) => {
  
  const payload = {
    Email: email,
    password:data.password
  }
 
  try {
    const res = await axios.post(`${BASE_URL}/api/Login/ChangePassword`, payload);
    return { status: true, message: res.data };
  } catch (e) {
    return { status: false, message: e.response.data };
  }
  finally {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  }
}