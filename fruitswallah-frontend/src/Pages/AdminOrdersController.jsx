import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import SidePannel from "../components/SidePannel";
import { adminSidebarItems } from "../data/Sidebar";
import { useState } from "react";
import {
  FaClock,
  FaDollarSign,
  FaEye,
  FaMoneyBillWave,
  FaShoppingCart,
} from "react-icons/fa";
import StatsCard from "../components/StatsCard";
import {
  GetfilteredOrders,
  GetOrderByOrderId,
} from "../services/OrdersController";
import { TbTruckReturn } from "react-icons/tb";
import { BsCheck, BsFillHouseAddFill } from "react-icons/bs";
import OrderPopup from "../components/OrderPopup";
import UpdateStatus from "../components/UpdateStatus";
import Pagination from "../components/Pagination";
import { getDashboardStats } from "../services/DashBoardService";
import { MdRealEstateAgent } from "react-icons/md";

const AdminOrdersController = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [activeItem, setActiveItem] = useState("View orders");
  const [filter, setFilter] = useState({
    range: "7d",
    type: "All",
    status: "All",
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  const lastPost = currentPage * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = orders.slice(firstPost, lastPost);
  var pages = [];
  for (let i = 1; i <= Math.ceil(orders.length / postPerPage); i++) {
    pages.push(i);
  }
  const [stats, setStats] = useState([]);

  const openOrder = async (orderId) => {
    setOrder(await GetOrderByOrderId(orderId));
    setShowOrderDetails(true);
  };
useEffect(() => {
   
    getstats();
  }, []);

  const getstats = async () => {
    const res = await getDashboardStats();
    setStats(res);
  }
  useEffect(() => {
    GetfilteredOrders(setOrders);
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="d-flex min-vh-100 mt-5 pt-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <SidePannel
          sidebarItems={adminSidebarItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <div className="flex-grow-1 p-4">
          <div className="container-fluid" style={{ maxWidth: "1024px" }}>
            <div className="mb-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h1 className="h2 fw-bold text-dark mb-0">
                    Orders Management
                  </h1>
                  <p className="text-muted mb-0">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <button
                  className="btn btn-outline-primary d-flex align-items-center ms-3"
                  style={{ height: "40px" }}
                  onClick={() => {
                    setShowStatusUpdate(true);
                  }}
                >
                  <BsCheck className="me-2" />
                  Update Status
                </button>
              </div>
              {showStatusUpdate && (
                <UpdateStatus setShowStatusUpdate={setShowStatusUpdate} />
              )}
              <div className="card shadow-sm border-0 mb-4 p-3">
                <div className="row g-3 align-items-center">
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Date Range</label>
                    <select
                      name="range"
                      className="form-select"
                      value={filter.range}
                      onChange={handleFilterChange}
                    >
                      <option value="1d">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                      <option value="90d">Last 90 Days</option>
                      <option value="all">All Time</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Order Type</label>
                    <select
                      name="type"
                      className="form-select"
                      value={filter.type}
                      onChange={handleFilterChange}
                    >
                      <option value="All">All</option>
                      <option value="COD">COD</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                      name="status"
                      className="form-select"
                      value={filter.status}
                      onChange={handleFilterChange}
                    >
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-3 align-items-center">
                <StatsCard
                  title="Total Orders"
                  value={stats.ordercount}
                  color="primary"
                  icon={<FaShoppingCart />}
                />
                <StatsCard
                  title="Active Orders"
                  value={stats.undeliveredCount}
                  color="secondary"
                  icon={<FaClock />}
                />
                <StatsCard
                  title="Delivered orders"
                  value={`${stats.deliveredorder}`}
                  color="success"
                  icon={<BsFillHouseAddFill />}
                />
                <StatsCard
                  title="Prepaid Orders"
                  value={`${stats.prepaidOrders}`}
                  color="info"
                  icon={<FaMoneyBillWave />}
                />
                <StatsCard
                  title="COD Orders"
                  value={`${stats.codOrders}`}
                  color="warning"
                  icon={<MdRealEstateAgent />}
                />
                <StatsCard
                  title="Return Orders"
                  value={`${stats.returnedOrder}`}
                  color="danger"
                  icon={<TbTruckReturn />}
                />
              </div>

              <div className="mt-4">
                <h3 className="h5 fw-bold text-dark mb-3">All Orders</h3>
                {orders.length === 0 ? (
                  <p className="text-muted">No orders found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-info">
                        <tr>
                          <th>Order ID</th>
                          <th>Order Date</th>
                          <th>Customer</th>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>Pincode</th>
                          <th>Payment Method</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPost.map((order, index) => (
                          <tr
                            key={order?.orderId}
                            className={`${
                              index % 2 == 0 ? "table-light" : "table-secondary"
                            }`}
                          >
                            <td>{order?.orderId}</td>
                            <td>
                              {new Date(order?.orderDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </td>
                            <td>{order?.name}</td>
                            <td>{order?.productName}</td>
                            <td>{order?.productPrice}</td>
                            <td>{order?.productQty}</td>
                            <td>
                              {order?.productPrice * order?.productQty >= 300
                                ? (
                                    order?.productPrice * order?.productQty
                                  ).toFixed(2)
                                : (
                                    order?.productPrice * order?.productQty +
                                    50
                                  ).toFixed(2)}
                            </td>
                            <td>{order?.postalCode}</td>
                            <td>
                              <span className="badge bg-secondary">
                                {order?.transactionType}
                              </span>
                            </td>
                            <td>
                              <span
                                className={`badge ${
                                  order.orderStatus.at(-1) === "Delivered"
                                    ? "bg-success"
                                    : "bg-warning text-dark"
                                }`}
                              >
                                {order?.orderStatus.at(-1)}{" "}
                              </span>
                            </td>
                            <td>
                              <span
                                className="btn btn-sm btn-outline-primary me-2 bg-white"
                                onClick={async () => {
                                  await openOrder(order.orderId);
                                }}
                              >
                                <FaEye className="text-primary" title="View" />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="flex-grow-1 d-flex justify-content-center">
                        <Pagination
                          pages={pages}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                        />
                      </div>
                      <div>
                        <select
                          name="postperpage"
                          id="postperpage"
                          className="form-select form-select-sm w-auto ms-2"
                          value={postPerPage}
                          onChange={(e) =>
                            setPostPerPage(Number(e.target.value))
                          }
                        >
                          <option value="10">10 orders</option>
                          <option value="20">20 orders</option>
                          <option value="50">50 orders</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {showOrderDetails && (
                  <OrderPopup
                    order={order[0]}
                    setShowOrderDetails={setShowOrderDetails}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrdersController;
