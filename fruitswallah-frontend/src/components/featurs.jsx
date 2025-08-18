import {
  FaCarSide,
  FaUserShield,
  FaExchangeAlt,
  FaPhoneAlt,
} from "react-icons/fa";
const Featurs = () => {
  return (
    <>
      <div className="container-fluid featurs">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-warning mb-5 mx-auto">
                  <FaCarSide className="fa-3x text-white" size={65} />
                </div>
                <div className="featurs-content text-center">
                  <h5>Free Shipping</h5>
                  <p className="mb-0">
                    Free delivery on order over &#8377; 300
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-warning mb-5 mx-auto">
                  <FaUserShield className="fa-3x text-white" size={65} />
                </div>
                <div className="featurs-content text-center">
                  <h5>Security Payment</h5>
                  <p className="mb-0">100% security payment</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-warning mb-5 mx-auto">
                  <FaExchangeAlt className="fa-3x text-white" size={65} />
                </div>
                <div className="featurs-content text-center">
                  <h5>1 Day Return</h5>
                  <p className="mb-0">1 day money guarantee</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-warning mb-5 mx-auto">
                <FaPhoneAlt className="fa-3x text-white" size={65} />
                </div>
                <div className="featurs-content text-center">
                  <h5>24/7 Support</h5>
                  <p className="mb-0">Support every time fast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Featurs;
