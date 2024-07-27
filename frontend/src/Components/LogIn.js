import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

export default function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform basic validation
    if (!userID || !password) {
      setError("User ID and Password are required.");
      return;
    }

    try {
      // Send login request
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and navigate to dashboard
        localStorage.setItem("token", data.token); // Save token if using JWT
        navigate("/dashboard");
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }

    // Clear fields
    setUserID("");
    setPassword("");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleForgotUserID = () => {
    navigate("/forgot-user-id");
  };

  return (
    <div className="login-container">
      <Container maxWidth="xs">
        <Box className="login-box" p={3} boxShadow={3}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="User ID"
                type="text"
                variant="outlined"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            {error && (
              <Typography color="error" variant="body2" gutterBottom>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#00248E",
                "&:hover": { backgroundColor: "#F15400" },
              }}
              fullWidth
            >
              Login
            </Button>
          </form>
          <div className="forgot">
            <Link
              component="button"
              onClick={handleForgotUserID}
              variant="body2"
            >
              Forgot User ID?
            </Link>
            <Link
              component="button"
              onClick={handleForgotPassword}
              variant="body2"
            >
              Forgot Password?
            </Link>
          </div>
        </Box>
      </Container>
    </div>
  );
}
