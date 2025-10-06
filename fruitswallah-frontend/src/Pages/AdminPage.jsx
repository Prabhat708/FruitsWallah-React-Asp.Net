import React, { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { GetProducts } from "../services/ProductController";
import {
  AddProducts,
  DeleteProduct,
  UpdateProduct,
} from "../services/AdminOperations";
import UpdateStatus from "../components/UpdateStatus";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaClock,
  FaDollarSign,
  FaEdit,
  FaMoneyBillWave,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../Stores/AuthStore";
import SetAdmin from "../components/SetAdmin";
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
import { GetAllOrders, GetRecentOrders } from "../services/OrdersController";
import {adminSidebarItems} from "../data/Sidebar";

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
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [products, setProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [stats, setStats] = useState({
    orders: 200,
    activeOrders: 10,
    TotalProducts: 100,
    TotalAdmins: 5,
    totalRevenue: 3520,
    pendingAmount: 7560,
  });
 
  const [activeItem, setActiveItem] = useState("Dashboard");

  const [formData, setFormData] = useState({
    productCategory: "",
    productName: "",
    productDescription: "",
    productPrice: "",
    productStock: "",
    productImage: null,
    existingImage: "", // Track existing image during edit
  });

  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  const isAdmin = useAuthStore((state) => state.isAdmin);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
    GetProducts(setProducts);
  }, []);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "productImage") {
      setFormData({ ...formData, productImage: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productPayload = {
      ProductCatagory: formData.productCategory,
      ProductName: formData.productName,
      ProductDescription: formData.productDescription,
      ProductPrice: formData.productPrice,
      ProductStock: formData.productStock,
    };

    if (formData.productImage) {
      productPayload.ProductImg = formData.productImage;
    }

    if (isEditMode && currentProduct) {
      await UpdateProduct(
        productPayload,
        currentProduct.productId,
        setProducts
      );
    } else {
      await AddProducts(productPayload, setProducts);
    }

    // Reset form
    setFormData({
      productCategory: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      productStock: "",
      productImage: null,
      existingImage: "",
    });
    setIsEditMode(false);
    setCurrentProduct(null);
  };

  const handleEditClick = (product) => {
    setIsEditMode(true);
    setCurrentProduct(product);
    setFormData({
      productCategory: product.productCatagory,
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productStock: product.productStock,
      productImage: null,
      existingImage: product.productImg,
    });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setCurrentProduct(null);
    setFormData({
      productCategory: "",
      productName: "",
      productDescription: "",
      productPrice: "",
      productStock: "",
      productImage: null,
      existingImage: "",
    });
  };

  const [filter, setFilter] = useState({
    range: "7d",
    type: "All",
    status: "All",
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
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
        data: [
          1200, 1900, 3000, 4000, 2300, 3400, 2900, 4100, 4200, 4100, 2100,
          1100,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  });
  const [overviewChart, setOverviewChart] = useState({
    labels: ["Total Orders", "Products", "Admins", "Active Orders"],
    datasets: [
      {
        label: "Count",
        data: [
          stats.orders,
          stats.TotalProducts,
          stats.TotalAdmins,
          stats.activeOrders,
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
          <div className="container-fluid" style={{ maxWidth: "1024px" }}>
            <div className="mb-4">
              <h1 className="h2 fw-bold text-dark mb-2">Admin Dashboard</h1>

              <p className="text-muted">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

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
                      <option value="1d">Today</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
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

              <div className="row g-3">
                <StatsCard
                  title="Total Orders"
                  value={stats.orders}
                  color="primary"
                  icon={<FaShoppingCart />}
                />
                <StatsCard
                  title="Active Orders"
                  value={stats.activeOrders}
                  color="secondary"
                  icon={<FaClock />}
                />
                <StatsCard
                  title="Total Products"
                  value={stats.TotalProducts}
                  color="success"
                  icon={<FaBox />}
                />
                <StatsCard
                  title="Total Admins"
                  value={stats.TotalAdmins}
                  color="warning"
                  icon={<FaUsers />}
                />
                <StatsCard
                  title="Total Revenue"
                  value={`$${stats.totalRevenue.toLocaleString()}`}
                  color="danger"
                  icon={<FaDollarSign />}
                />
                <StatsCard
                  title="Pending Payments"
                  value={`$${stats.pendingAmount}`}
                  color="info"
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
                    <thead className="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order) => (
                        <tr key={order.orderId}>
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
