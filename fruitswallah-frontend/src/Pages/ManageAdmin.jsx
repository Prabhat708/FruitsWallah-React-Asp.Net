import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SidePannel from "../components/SidePannel";
import { adminSidebarItems } from "../data/Sidebar";
import { BsCheck } from "react-icons/bs";
import StatsCard from "../components/StatsCard";
import {
  FaEdit,
  FaUserClock,
  FaUserInjured,
  FaUsersSlash,
  FaSearch,
} from "react-icons/fa";
import SetAdmin from "../components/SetAdmin";
import { GetAllUsers } from "../services/AdminOperations";
import { getDashboardStats } from "../services/DashBoardService";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaUserPen } from "react-icons/fa6";

const ManageAdmin = () => {
  const [activeItem, setActiveItem] = useState("Manage Admins");
  const [showUpdateAdmins, setShowUpdateAdmins] = useState(false);
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
useEffect(() => {
   GetAllUsers(setUsers);
    getstats();
  }, [showUpdateAdmins]);

  const getstats = async () => {
    const res = await getDashboardStats();
    setStats(res);
  };


  const admins = users.filter(u => u.isAdmin);
  const filteredAdmins = admins.filter((a) => {
    if (!search || search.trim() === "") return true;
    const q = search.trim().toLowerCase();
    const name = (a.name || "").toString().toLowerCase();
    const email = (a.email || "").toString().toLowerCase();
    const phone = (a.phoneNumber || "").toString().toLowerCase();
    return (
      name.includes(q) ||
      email.includes(q) ||
      phone.includes(q)
    );
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
          <div className="container-fluid">
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
                  value={stats.totalUsers}
                  color="primary"
                  icon={<PiUsersThreeFill />}
                />
                <StatsCard
                  title="Active Users"
                  value={stats.activeUsers}
                  color="secondary"
                  icon={<FaUserClock />}
                />
                <StatsCard
                  title="Active Admins"
                  value={stats.totalAdmins}
                  color="info"
                  icon={<FaUserPen/>}
                />
                <StatsCard
                  title="Inactive Users"
                  value={stats.inactiveUsers}
                  color="warning"
                  icon={<FaUserInjured />}
                />
                <StatsCard
                  title="Deleted Users"
                  value={stats.deletedUsers}
                  color="danger"
                  icon={<FaUsersSlash />}
                />
              </div>

              {/* Admins Interactive Form and Table */}

              <div className="d-flex align-items-center justify-content-between mt-4">
                <h4 className="mb-0">All Admins ({admins.length})</h4>
                <div className="input-group" style={{ width: 360 }}>
                  <span className="input-group-text bg-white">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email or phone"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setSearch("")}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div className="table-responsive mt-3">
                <table className="table table-bordered table-hover">
                  <thead className="table-info">
                    <tr>
                      <th>S.No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          No admins found for "{search.slice(0,20)}".
                        </td>
                      </tr>
                    ) : (
                      filteredAdmins.map((admin, index) => (
                        <tr
                          key={admin.id ?? index}
                          className={`${
                            index % 2 == 0 ? "table-light" : "table-secondary"
                          }`}
                        >
                          <td>{index + 1}</td>
                          <td>{admin.name}</td>
                          <td>{admin.email}</td>
                          <td>{admin.phoneNumber}</td>
                          <td>
                            {admin.email == "fruitswallah.in@gmail.com"
                              ? "Super Admin"
                              : "Admin"}
                          </td>
                          <td>
                            {admin.email == "fruitswallah.in@gmail.com" ? (
                              ""
                            ) : (
                              <button
                                className="text-primary border-0 bg-transparent "
                                onClick={() => {
                                  setShowUpdateAdmins(true);
                                }}
                              >
                                <FaEdit size={25} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* End Admins Interactive Form and Table */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAdmin;
