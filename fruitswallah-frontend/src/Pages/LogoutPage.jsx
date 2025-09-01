import React, { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { HandleLogout } from '../services/HandleLoginLogout';

const LogoutPage = () => {
    const navigate = useNavigate(); 
    useEffect(() => {
        HandleLogout(navigate);
    }, []);
    
  return null;
}

export default LogoutPage
