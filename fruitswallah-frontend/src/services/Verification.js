import axios from "axios";
import CryptoJS from "crypto-js";
const _kEY = import.meta.env.VITE_ENCRYPTION_KEY;
const _IV = import.meta.env.VITE_ENCRYPTION_IV;

export const sendOtp = async (email,setBOtp,setIsOtpSent,setLoading) => {
    try {
      const payload = {
        email: email,
      };
      const response = await axios.post(
        "https://localhost:7293/api/OTP",
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