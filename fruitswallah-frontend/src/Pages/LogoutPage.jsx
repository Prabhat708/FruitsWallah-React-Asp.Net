import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate(); 
    useEffect(() => {
        handleLogout();
    }, []);
    const handleLogout = () => {

    localStorage.removeItem("isLogin");
        navigate("/home",{ state: { message: "You have been logged out successfully." } });
    }
    
  return (
    <>
      
    </>
  )
}

export default LogoutPage
