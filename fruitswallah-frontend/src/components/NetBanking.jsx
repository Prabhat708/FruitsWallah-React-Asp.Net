import React from 'react'
import { FaMobileAlt } from 'react-icons/fa';
import { PostOrders } from '../services/OrdersController';

const NetBanking = () => {
  return (
    <>
      <div id="net-banking" className="tab-pane fade show active pt-3">
        <div className="form-group ">
          {" "}
                  <label htmlFor="Select Your Bank">
                      <h6 className='text-danger'>Currently Net banking is not availble. It will come soon...</h6>
            <h6>Select your Bank</h6>
          </label>{" "}
          <select className="form-control" id="ccmonth" disabled>
            <option value="" selected disabled>
              --Please select your Bank--
            </option>
            <option>Bank 1</option>
            <option>Bank 2</option>
            <option>Bank 3</option>
            <option>Bank 4</option>
            <option>Bank 5</option>
            <option>Bank 6</option>
            <option>Bank 7</option>
            <option>Bank 8</option>
            <option>Bank 9</option>
            <option>Bank 10</option>
          </select>{" "}
        </div>
        <div className="form-group">
          <p>
            {" "}
            <button type="button" className="btn btn-primary mt-2 ms-3" disabled onClick={() => {
                      PostOrders("Net Banking")
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
