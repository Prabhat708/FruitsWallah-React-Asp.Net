import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import SidePannel from '../components/SidePannel';
import { adminSidebarItems } from "../data/Sidebar";
import { BsCheck } from 'react-icons/bs';
import StatsCard from '../components/StatsCard';
import { FaBitcoin, FaClock, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import SetAdmin from '../components/SetAdmin';

const ManageAdmin = () => {
    const [activeItem, setActiveItem] = useState("Manage Admins");
    const [showUpdateAdmins, setShowUpdateAdmins] = useState(false);
    const [stats, setStats] = useState({
        users: 120,
        activeUsers: 15,
        Admins: 1,
        InactiveUsers: 5,
      });
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
                    Users Management
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
                    setShowUpdateAdmins(true);
                  }}
                >
                  <BsCheck className="me-2" />
                  Update Role
                </button>
              </div>
              {showUpdateAdmins && (
                <SetAdmin setShowUpdateAdmins={setShowUpdateAdmins} />
              )}

              <div className="row g-3 align-items-center">
                <StatsCard
                  title="Total Users"
                  value={stats.users}
                  color="primary"
                  icon={<FaShoppingCart />}
                />
                <StatsCard
                  title="Active Users"
                  value={stats.activeUsers}
                  color="secondary"
                  icon={<FaClock />}
                />
                <StatsCard
                  title="Active Admins"
                  value={stats.Admins}
                  color="secondary"
                  icon={<FaSignOutAlt />}
                />
                <StatsCard
                  title="Inactive Users"
                  value={stats.InactiveUsers}
                  color="danger"
                  icon={<FaBitcoin />}
                />
                          </div>
                          
                          
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageAdmin
