import React, { useEffect, useState } from "react";
import { GetAllOrders, UpdatesStatus } from "../services/OrdersController";



const UpdateStatus = () => {
  const [form, setForm] = useState({
    orderId: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      UpdatesStatus(form.orderId,form.status)
  };

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        GetAllOrders(setOrders);
    }, []);
  return (
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
              onChange={handleChange}
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
              <option value="Dispatched">Dispatched</option>
              <option value="En Route">En Route</option>
              <option value="Out For delivery">Out For delivery</option>
              <option value="Delivered">Delivered</option>
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
  );
};

export default UpdateStatus;
