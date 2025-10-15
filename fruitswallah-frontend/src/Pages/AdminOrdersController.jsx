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
    range: "0",
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
  GetfilteredOrders(filter.range, filter.status, filter.type, setOrders);
  }, [filter]);

  const getstats = async () => {
    const res = await getDashboardStats(filter.range);

    setStats(res);
  }

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
          <div className="container-fluid">
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
                  title="Cancelled Orders"
                  value={`${stats.returnedOrder}`}
                  color="danger"
                  icon={<TbTruckReturn />}
                />
              </div>

              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h3 fw-bold text-dark mb-0">All Orders</h2>
                  <div className="d-flex align-items-end gap-3">
                    <div>
                      <label className="form-label fw-semibold mb-1">
                        Date Range
                      </label>
                      <select
                        name="range"
                        className="form-select form-select-sm"
                        value={filter.range}
                        onChange={handleFilterChange}
                      >
                        <option value="1">Today</option>
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                        <option value="0">All Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label fw-semibold mb-1">
                        Order Type
                      </label>
                      <select
                        name="type"
                        className="form-select form-select-sm"
                        value={filter.type}
                        onChange={handleFilterChange}
                      >
                        <option value="All">All</option>
                        <option value="COD">COD</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label fw-semibold mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        className="form-select form-select-sm"
                        value={filter.status}
                        onChange={handleFilterChange}
                      >
                        <option value="All">All</option>
                        <option value="Placed">Placed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="En Route">En Route</option>
                        <option value="Out For delivery">
                          Out For delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
                {orders.length === 0 ? (
                  <p className="text-muted">No orders found.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-info">
                          <tr>
                            <th>S.No.</th>
                          <th>Order ID</th>
                          <th>Order Date</th>
                          <th>Customer</th>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          
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
                              <td>{(currentPage-1)*10+ index+1}</td>
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
                                    : order.orderStatus.at(-1) === "Cancelled"
                                    ? "bg-danger"
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
