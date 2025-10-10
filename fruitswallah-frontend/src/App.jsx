
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AppRoutes from "./Routes/AppRoutes";
import { useEffect } from "react";
import useAuthStore from "./Stores/AuthStore";
import { CartProvider } from "./Context/CartContext";

function App() {
  useEffect(() => {
    useAuthStore.getState().initializeAuth();
  }, []);
  return (
    <>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </>
  )}

export default App
