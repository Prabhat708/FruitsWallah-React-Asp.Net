import React from 'react'

const UPI = () => {
  return (
    <>
      <div id="paypal" className="tab-pane fade show active pt-3">
        <h6 className="pb-2">Enter Your UPI Id here</h6>
              <div className="input-group">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="example@upi"
                      required
                  />
              </div>
          <button type="button" className="btn btn-primary mt-2 ms-3 "> Proceed
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
