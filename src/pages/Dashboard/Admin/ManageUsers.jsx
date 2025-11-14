import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/userService";
import MainLayout from "../../../layout/MainLayout";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState("PARTICIPANT"); 

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filteredUsers = users.filter((u) => u.role === selectedTab);

  return (
    <MainLayout>
    <div className="container-fluid">
      <h3 className="fw-bold text-primary mb-4">
        <i className="bi bi-people me-2"></i>
        Manage Users
      </h3>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className={`btn ${selectedTab === "PARTICIPANT" ? "btn-info" : "btn-outline-info"}`}
              onClick={() => setSelectedTab("PARTICIPANT")}
            >
              <i className="bi bi-person me-2"></i>
              Participants
            </button>

            <button
              className={`btn ${selectedTab === "ORGANIZER" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setSelectedTab("ORGANIZER")}
            >
              <i className="bi bi-person-badge me-2"></i>
              Organizers
            </button>

            <button
              className={`btn ${selectedTab === "ADMIN" ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => setSelectedTab("ADMIN")}
            >
              <i className="bi bi-shield-check me-2"></i>
              Administrators
            </button>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: "40px",
                            height: "40px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white"
                          }}
                        >
                          <i className="bi bi-person-fill"></i>
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">{u.username}</h6>
                          <small className="text-muted">User ID: {u.id}</small>
                        </div>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          u.role === "PARTICIPANT"
                            ? "bg-info"
                            : u.role === "ORGANIZER"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {u.role === "PARTICIPANT" ? "Participant" : u.role}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-people display-1 text-muted mb-3"></i>
              <h5 className="text-muted">No users found in this category.</h5>
            </div>
          )}
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default ManageUsers;