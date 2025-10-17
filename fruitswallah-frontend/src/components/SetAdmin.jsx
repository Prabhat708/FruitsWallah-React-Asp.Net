import React, { use, useEffect, useState } from "react";
import SuccessMessage from "./SuccessMessage";
import { GetAllUsers, UpdateUserRole } from "../services/AdminOperations";
import useAuthStore from "../Stores/AuthStore";
import AlertMessage from "./AlertMessage";

const SetAdmin = ({ setShowUpdateAdmins }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [res, setRes] = useState(null);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    Email: "",
    Role: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    GetAllUsers(setUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await UpdateUserRole(form.Email, form.Role, setUsers);
    setRes(resp);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);

    
    e.target.reset();
    setForm({ Email: "", Role: "" });
  };

  var user = users.filter(
    (user) =>
      user.userId != useAuthStore.getState().UserId &&
      user.email != "fruitswallah.in@gmail.com"
  );
  return (
    <>
      <>
        {showPopup && (
          <AlertMessage status={res.success} message={res.message} />
        )}
        <div className="container mt-5 d-flex justify-content-center mb-4">
          <div
            className="card shadow p-4"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <h4 className="text-center text-success mb-4">Update User Role</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label fw-semibold">
                  User Email
                </label>
                <input
                  className="form-control"
                  name="Email"
                  id="Email"
                  value={form.Email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  required
                />

                
              </div>

              <div className="mb-3">
                <label htmlFor="Role" className="form-label fw-semibold">
                  Role
                </label>
                <select
                  className="form-select"
                  name="Role"
                  id="Role"
                  value={form.Role}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Role --</option>
                  {user.filter((u) => u.email == form.Email)[0]?.isAdmin ? (
                    <option value="User">User</option>
                  ) : (
                    <option value="Admin">Admin</option>
                  )}
                </select>
              </div>
              <div className="row gap-5 ms-5">
                <button type="submit" className="btn btn-success col-4">
                  Update Role
                </button>
                <button type="submit" className="btn btn-danger col-4" onClick={() => {
                  setShowUpdateAdmins(false);
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default SetAdmin;
