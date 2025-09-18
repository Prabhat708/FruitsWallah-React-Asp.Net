import React, { useEffect, useState } from "react";
import { GetAllOrders, UpdatesStatus } from "../services/OrdersController";
import SuccessMessage from "./SuccessMessage";

const UpdateStatus = () => {
  const [statuslen,setStatuslen]=useState(1)
  const statusFlow = ["Placed",
    "Dispatched",
    "En Route",
    "Out For delivery",
    "Delivered",
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    orderId: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdatesStatus(form.orderId, form.status, setShowPopup);
    e.target.reset();
  };

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        GetAllOrders(setOrders);
    }, []);
  
  const handleOrderIdChange = (orderId) => {
    var orderstatus = orders.find(o => o.orderId == orderId)
    setStatuslen(orderstatus.orderStatus.length);
  }
  return (
    <>
      {showPopup && (
        <SuccessMessage
          className="mt-5"
          message={"Status Updated Successfuly!"}
        />
      )}
      <div className="container mt-5 d-flex justify-content-center">
        <div
          className="card shadow p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h4 className="text-center text-success mb-4">Update Order Status</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="OrderId" className="form-label fw-semibold">
                Order ID
              </label>
              <select
                className="form-select"
                name="orderId"
                id="OrderId"
                value={form.orderId}
                onChange={(e) => {
                  const selectedOrderId = e.target.value;
                  handleChange(e); // If you're managing form state
                  handleOrderIdChange(selectedOrderId); // Your custom function
                }}
                required
              >
                <option value="">-- Select OrderId --</option>
                {orders.map((order) => (
                  <option key={order.orderId} value={order.orderId}>
                    {order.orderId}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="OrderStatus" className="form-label fw-semibold">
                Order Status
              </label>
              <select
                className="form-select"
                name="status"
                id="OrderStatus"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Status --</option>

                {statuslen == 5 ? (
                  <option value="">-- No More Options --</option>
                ) : (
                  statusFlow.slice(statuslen).map((statusValue, index) => {
                    return (
                      <option key={index} value={statusValue}>
                        {statusValue}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateStatus;
