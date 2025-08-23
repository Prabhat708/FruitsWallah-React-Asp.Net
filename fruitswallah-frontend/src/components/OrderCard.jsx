import React from 'react'

const OrderCard = ({ order, borderColor , getStatusIcon,getStatusText}) => {
  return (
    <>
      <div
        className="card border-0 shadow-sm"
        style={{ borderLeft: `4px solid ${borderColor}` }}
      >
        <div className="card-body p-4">
          <div className="d-flex align-items-start justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              {getStatusIcon(order.status)}
              <span className="fw-medium text-dark">
                {getStatusText(order.status)} {order.deliveryDate}
              </span>
            </div>
            {(order.status === "dispatched" || order.status === "expected") && (
              <button className="btn btn-success btn-sm">Track order</button>
            )}
          </div>

          {order.deliveryTime && (
            <p className="text-muted small mb-3">{order.deliveryTime}</p>
          )}

          <div className="d-flex flex-column gap-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center border-bottom border-secondry justify-content-between pb-1"
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="position-relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded border"
                      style={{
                        width: "64px",
                        height: "64px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <h6 className="fw-medium text-dark mb-0">{item.name}</h6>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2">
                  <button className="btn btn-outline-primary btn-sm">
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard
