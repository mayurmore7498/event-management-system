import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { loginUser } from "../services/authService.js";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });

      const user = {
        id: response.id,
        token: response.token,
        role: response.role,
        email: response.email,
        name: response.name || "",
      };

      localStorage.setItem("id", user.id);
      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);

      setUser(user);

      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "ORGANIZER") navigate("/organizer/dashboard");
      else navigate("/participant/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        padding: "2rem 1rem"
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-7">
            <div 
              className="card shadow-lg border-0"
              style={{
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 
                    className="fw-bold mb-2"
                    style={{
                      background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                  >
                    Welcome Back
                  </h3>
                  <p className="text-muted">Sign in to your EventEase account</p>
                </div>

                {error && (
                  <div 
                    className="alert alert-danger d-flex align-items-center"
                    role="alert"
                    style={{ 
                      borderRadius: "10px",
                      border: "none",
                      background: "rgba(220, 53, 69, 0.1)",
                      color: "#dc3545"
                    }}
                  >
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark">Email Address</label>
                    <div className="input-group">
                      <span 
                        className="input-group-text"
                        style={{
                          background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                          border: "none",
                          color: "white"
                        }}
                      >
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        style={{ 
                          borderRadius: "0 8px 8px 0",
                          border: "1px solid #e43f5a",
                          borderLeft: "none"
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark">Password</label>
                    <div className="input-group">
                      <span 
                        className="input-group-text"
                        style={{
                          background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                          border: "none",
                          color: "white"
                        }}
                      >
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        style={{ 
                          borderRadius: "0 8px 8px 0",
                          border: "1px solid #e43f5a",
                          borderLeft: "none"
                        }}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn w-100 py-3 fw-bold mb-3"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(135deg, #e43f5a 0%, #d42a45 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      fontSize: "1.1rem"
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 8px 25px rgba(228, 63, 90, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!loading) {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing In...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Sign In
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <small className="text-muted">
                      Don't have an account?{" "}
                      <a 
                        href="/register" 
                        className="text-decoration-none fw-semibold"
                        style={{ color: "#e43f5a" }}
                      >
                        Create Account
                      </a>
                    </small>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;