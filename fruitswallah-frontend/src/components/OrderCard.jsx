import React from 'react'

const OrderCard = ({ order, borderColor, getStatusIcon, getStatusText }) => {
  console.log(order)
  return (
    <>
      <div
        className="card border-0 shadow-sm"
        style={{ borderLeft: `4px solid ${borderColor}` }}
      >
        <div className="card-body p-4">
          <div className="d-flex align-items-start justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              {getStatusIcon(order?.orderStatus)}
              <span className="fw-medium text-dark">
                {getStatusText(order?.orderStatus)}
              </span>
            </div>
            {(order?.orderStatus.at(-1) === "dispatched" ||
              order?.orderStatus.at(-1) === "expected") && (
              <button className="btn btn-success btn-sm">Track order</button>
            )}
          </div>

          {order?.deliveredOn && (
            <p className="text-muted small mb-3">
              {order?.deliveredOn.split("T")[0]}
            </p>
          )}

          <div className="d-flex flex-column gap-3">
            <div
              key={order.orderId}
              className="d-flex align-items-center border-bottom border-secondry justify-content-between pb-1"
            >
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative">
                  <img
                    src={"https://localhost:7293" + order.productImg}
                    alt={order.productName}
                    className="rounded border"
                    style={{
                      width: "64px",
                      height: "64px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <h6 className="fw-medium text-dark mb-0">
                    {order.productName}
                  </h6>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <button className="btn btn-outline-primary btn-sm">
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard
