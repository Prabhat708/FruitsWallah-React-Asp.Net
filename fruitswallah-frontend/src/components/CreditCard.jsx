import React from 'react'

const CreditCard = () => {
  return (
    <>
      
        <div id="credit-card" className="tab-pane fade show active pt-3">
          <form role="form">
            <div className="form-group">
              {" "}
              <label htmlFor="username">
                <h6>Card Owner</h6>
              </label>{" "}
              <input
                type="text"
                name="username"
                placeholder="Card Owner Name"
                required
                className="form-control "
              />{" "}
            </div>
            <div className="form-group">
              {" "}
              <label htmlFor="cardNumber">
                <h6>Card number</h6>
              </label>
              <div className="input-group">
                {" "}
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Valid card number"
                  className="form-control "
                  required
                />
                <div className="input-group-append">
                  {" "}
                  <span className="input-group-text text-muted">
                    {" "}
                    <i className="fab fa-cc-visa mx-1"></i>{" "}
                    <i className="fab fa-cc-mastercard mx-1"></i>{" "}
                    <i className="fab fa-cc-amex mx-1"></i>{" "}
                  </span>{" "}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8">
                <div className="form-group">
                  {" "}
                  <label>
                    <span className="hidden-xs">
                      <h6>Expiration Date</h6>
                    </span>
                  </label>
                  <div className="input-group">
                    {" "}
                    <input
                      type="number"
                      placeholder="MM"
                      name=""
                      className="form-control"
                      required
                    />{" "}
                    <input
                      type="number"
                      placeholder="YY"
                      name=""
                      className="form-control"
                      required
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group mb-4">
                  {" "}
                  <label
                    data-toggle="tooltip"
                    title="Three digit CV code on the back of your card"
                  >
                    <h6>
                      CVV <i className="fa fa-question-circle d-inline"></i>
                    </h6>
                  </label>{" "}
                  <input type="text" required className="form-control" />{" "}
                </div>
              </div>
            </div>
            <div className="card-footer">
              {" "}
              <button
                type="button"
                className="subscribe btn btn-primary btn-block shadow-sm"
              >
                {" "}
                Confirm Payment{" "}
              </button>
            </div>
          </form>
        </div>
     
    </>
  );
}

export default CreditCard
