import React, { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaClock,
  FaDollarSign,
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import useAuthStore from "../Stores/AuthStore";
import SidePannel from "../components/SidePannel";
import StatsCard from "../components/StatsCard";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { GetRecentOrders } from "../services/OrdersController";
import { adminSidebarItems } from "../data/Sidebar";
import {
  getDashboardStats,
  getRevenueData,
} from "../services/DashBoardService";
import { BsFillTruckFrontFill } from "react-icons/bs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminPage = () => {
  const [stats, setStats] = useState([]);
  const [overviewChart, setOverviewChart] = useState({
    labels: ["Total Orders", "Products", "Admins", "Active Orders"],
    datasets: [
      {
        label: "Count",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const [revenueChart, setRevenueChart] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  });
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [orders, setOrders] = useState(null);
  const [filter, setFilter] = useState({
    range: "0"
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    getstats();
  }, [filter]);

  const getstats = async () => {
    const res = await getDashboardStats(filter.range);
    setStats(res);
    const revnue = await getRevenueData();
    setOverviewChart({
      labels: ["Total Orders", "Products", "Admins", "Active Orders"],
      datasets: [
        {
          label: "Count",
          data: [
            res.ordercount,
            res.activeProducts,
            res.totalAdmins,
            res.undeliveredCount,
          ],
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
    setRevenueChart({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Revenue",
          data: [
            revnue[0],
            revnue[1],
            revnue[2],
            revnue[3],
            revnue[4],
            revnue[5],
            revnue[6],
            revnue[7],
            revnue[8],
            revnue[9],
            revnue[10],
            revnue[11],
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    });
  };

  useEffect(() => {
    GetRecentOrders(setOrders);
  }, []);

  if (!orders) {
    return <div>Loading...</div>;
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
                  <h1 className="h2 fw-bold text-dark mb-2">Admin Dashboard</h1>
                  <p className="text-muted mb-0">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-12">
                    <label className="form-label fw-semibold">Date Range</label>
                    <select
                      name="range"
                      className="form-select"
                      value={filter.range}
                      onChange={handleFilterChange}
                    >
                      <option value="1">Today</option>
                      <option value="7">Last 7 Days</option>
                      <option value="30">Last 30 Days</option>
                      <option value="90">Last 90 Days</option>
                      <option value="0">ALL</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row g-3">
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
                  icon={<BsFillTruckFrontFill />}
                />
                <StatsCard
                  title="Active Products"
                  value={stats.activeProducts}
                  color="success"
                  icon={<FaBox />}
                />
                <StatsCard
                  title="Total Admins"
                  value={stats.totalAdmins}
                  color="warning"
                  icon={<FaUsers />}
                />
                <StatsCard
                  title="Received Payments"
                  value={`₹${stats.totalRevenue}`}
                  color="info"
                  icon={<FaDollarSign />}
                />
                <StatsCard
                  title="Pending Payments"
                  value={`₹${stats.pendingPayment}`}
                  color="danger"
                  icon={<FaMoneyBillWave />}
                />
              </div>
              {/* Charts */}
              <div className="row mt-4">
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm border-0 p-3 h-100">
                    <h6 className="fw-semibold text-muted mb-3">
                      Revenue Trend
                    </h6>
                    <Line
                      data={revenueChart}
                      options={{
                        responsive: true,
                        plugins: { legend: { position: "bottom" } },
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm border-0 p-3 h-100">
                    <h6 className="fw-semibold text-muted mb-3">
                      System Overview
                    </h6>

                    <Bar
                      data={overviewChart}
                      options={{
                        responsive: true,
                        plugins: { legend: { display: false } },
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="card shadow-sm border-0 mt-4 p-3">
                <h6 className="fw-semibold text-muted mb-3">
                  Recent Orders ({orders.length})
                </h6>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-info">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order, index) => (
                        <tr
                          key={order.orderId}
                          className={`${
                            index % 2 == 0 ? "table-light" : "table-secondary"
                          }`}
                        >
                          <td>{order.orderId}</td>
                          <td>{order.name}</td>
                          <td>{order.amount}</td>
                          <td>
                            <span className="badge bg-secondary">
                              {order.transactionType}
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
                              {order.orderStatus.at(-1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center text-muted py-3"
>
                            No orders found for selected filters
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
