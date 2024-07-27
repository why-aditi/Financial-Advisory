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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleForgotUserID = () => {
    navigate("/forgot-user-id");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("authToken", data.token);
        alert(data.msg);
        if (data.msg === "Login successful") {
          navigate("/dashboard");
        }
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in");
    }
  };

  return (
    <div className="login-container">
      <Container maxWidth="xs">
        <Box className="login-box" p={3} boxShadow={3}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#F15400",
                "&:hover": { backgroundColor: "#00248E" },
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
