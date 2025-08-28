import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate(); 
    useEffect(() => {
        handleLogout();
    }, []);
    const handleLogout = () => {

    localStorage.removeItem("isLogin");
        navigate("/home");
    }
    
  return (
    <>
      
    </>
  )
}

export default LogoutPage
