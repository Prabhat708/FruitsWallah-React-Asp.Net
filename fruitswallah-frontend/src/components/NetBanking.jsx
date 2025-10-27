import React from 'react'
import { FaMobileAlt } from 'react-icons/fa';
import { PostOrders } from '../services/OrdersController';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const NetBanking = ({ setShowPopup, setRes, setAddress, Amount }) => {
  const { setCartItems } = useCart();
  const navigate = useNavigate();
  return (
    <>
      <div id="net-banking" className="tab-pane fade show active pt-3">
        
        <div className="form-group">
          <p>
            {" "}
            <button type="button" className="btn btn-primary mt-2 ms-3"  onClick={async () => {
                        setRes(
                          await PostOrders(
                            "NetBanking",
                            setShowPopup,
                            navigate,
                            setCartItems,
                            setAddress,
                            Amount >= 300 ? Amount : Amount + 50
                          )
                        );
                      }}>
             <FaMobileAlt/> Proceed Payment
            </button>{" "}
          </p>
        </div>
        <p className="text-muted">
          Note: After clicking on the button, you will be directed to a secure
          gateway for payment. After completing the payment process, you will be
          redirected back to the website to view details of your order.{" "}
        </p>
      </div>
    </>
  );
}

export default NetBanking
