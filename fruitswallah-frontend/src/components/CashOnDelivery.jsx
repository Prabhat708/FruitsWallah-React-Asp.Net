import React from "react";
import { FaMobileAlt } from "react-icons/fa";

const CashOnDelivery = () => {
  return (
    <div id="net-banking" className="tab-pane fade show active pt-3">
      <div className="form-group ">
        <label htmlFor="Select Your Bank">
          <h6 className="text-danger">
            Currently COD is not availble. It will come soon...
          </h6>
        </label>
          </div>
          <div className="form-group">
                    <p>
                      {" "}
                      <button type="button" className="btn btn-primary mt-2 ms-3" disabled>
                       <FaMobileAlt/> Proceed Payment
                      </button>{" "}
                    </p>
                  </div>
    </div>
  );
};

export default CashOnDelivery;
