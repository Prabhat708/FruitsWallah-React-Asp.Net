
import "./App.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AppRoutes from "./Routes/AppRoutes";
import { CartProvider } from "./CartContext";
function App() {
  return (
    <>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </>
  );}

export default App
