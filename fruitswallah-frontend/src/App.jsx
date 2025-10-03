
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AppRoutes from "./Routes/AppRoutes";
import { CartProvider } from "../src/components/CartContext";
import { useEffect } from "react";
import useAuthStore from "./Stores/AuthStore";

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
