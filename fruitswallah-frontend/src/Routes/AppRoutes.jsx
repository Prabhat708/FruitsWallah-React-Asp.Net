
import { Routes, Route } from "react-router-dom";
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import SignUpPage from "../Pages/SignUpPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/signup" element={<SignUpPage />} />
      </Routes>
  )
}

export default AppRoutes
