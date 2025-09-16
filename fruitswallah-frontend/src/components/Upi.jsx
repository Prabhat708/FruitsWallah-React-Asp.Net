import React from 'react'
import { PostOrders } from '../services/OrdersController';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const UPI = ({ setShowPopup, Amount } ) => {
  const { setCartItems } = useCart();
  const navigate = useNavigate();
  return (
    <>
      <div id="paypal" className="tab-pane fade show active pt-3">
        
        <button type="button" className="btn btn-primary mt-2 ms-3 " onClick={() => {
          PostOrders("UPI", setShowPopup, navigate, setCartItems, Amount>=300?Amount:Amount+50);
          }}> Proceed
          </button>{" "}
        
        <p className="text-muted">
          {" "}
          Note: After clicking on the button, you will be directed to a secure
          gateway for payment. After completing the payment process, you will be
          redirected back to the website to view details of your order.{" "}
        </p>
      </div>
    </>
  );
}

export default UPI
