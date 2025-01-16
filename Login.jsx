import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginReviewer, loginHod, loginAdmin } from "../services/api";
import { CircularProgress } from "@mui/material";
import logo from "./muj_header.png";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e, role) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      const loginFn =
        role === "reviewer"
          ? loginReviewer
          : role === "hod"
          ? loginHod
          : loginAdmin; // Add the logic for admin login
      const response = await loginFn({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", response.id);
      localStorage.setItem("isAuthenticated", "true");

      navigate(
        role === "reviewer" ? "/reviewer" : role === "hod" ? "/hod" : "/admin"
      );
    } catch (error) {
      setError(error.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  //     if (response.ok) {
  //       const data = await response.json();
  //       localStorage.setItem('token', data.token);

  //       if (role === 'reviewer') {
  //         navigate('/reviewer/submissions');
  //       } else if (role === 'hod') {
  //         navigate('/hod/submissions/approved');
  //       }
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.error || 'Invalid credentials');
  //     }
  //   } catch (err) {
  //     console.error('Error logging in:', err);
  //     setError('Something went wrong. Please try again.');
  //   }
  // };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Full viewport height
        minWidth: "100vw",
        display: "block",

        alignItems: "center", // Vertical alignment
        justifyContent: "center", // Horizontal alignment
        backgroundColor: "#f5f5f5", // Light gray background
        color: "#1e4c90", // Primary text color
      }}
    >
      <>
        <div className="app-header">
          {/* Header Section */}
          <Box
            sx={{
              width: "100%",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo} // Replace with the actual path to your logo
              alt="Manipal University Jaipur"
              style={{
                maxWidth: "400px", // Adjust logo size
                height: "auto",
              }}
            />
          </Box>
          <Container>
            <Typography
              variant="h4"
              align="center"
              sx={{
                mb: 4,
                fontWeight: "bold",
                color: "#335DA2", // Use blue for title
              }}
            >
              Staff Login Portal
            </Typography>
          </Container>
        </div>
        <Container maxWidth="sm">
          <Paper
            className="login-container"
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#fff", // White background
              border: "1px solid #e0e0e0",
            }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={{ backgroundColor: "white" }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                {["hod", "reviewer", "admin"].map((role) => (
                  <Button
                    key={role}
                    fullWidth
                    variant="contained"
                    color={
                      role === "hod" || role === "reviewer"
                        ? "primary"
                        : "error"
                    } // Admin button color
                    size="large"
                    onClick={(e) => handleSubmit(e, role)}
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      backgroundColor: 
                        role === "hod" 
                          ? "#d05c24"  // Blue for HOD
                          : role === "reviewer"
                          ? "#d26c20"  // Green for Reviewer
                          : "#d37a1b", // Red for Admin
                      "&:hover": {
                        backgroundColor: 
                          role === "hod"
                            ? "#c2521a"  // Darker Blue for HOD
                            : role === "reviewer"
                            ? "#d16722"  // Darker Green for Reviewer
                            : "#d3781c", // Darker Red for Admin
                      },
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      `Login as ${role.toUpperCase()}`
                    )}
                  </Button>
                ))}
              </Box>
            </form>
          </Paper>
        </Container>
      </>
    </Box>
  );
}

export default Login;
