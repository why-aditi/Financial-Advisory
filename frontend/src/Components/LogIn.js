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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User ID:", userID, "Password:", password);
    setUserID("");
    setPassword("");
    navigate("/dashboard");
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
            <Box mt={2}>
              <Link
                component="button"
                onClick={handleForgotUserID}
                variant="body2"
              >
                Forgot User ID?
              </Link>
            </Box>
            <Box mt={1}>
              <Link
                component="button"
                onClick={handleForgotPassword}
                variant="body2"
              >
                Forgot Password?
              </Link>
            </Box>
          </div>
        </Box>
      </Container>
    </div>
  );
}
