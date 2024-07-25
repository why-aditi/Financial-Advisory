import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
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
                backgroundColor: "#F15400",
                "&:hover": { backgroundColor: "#00248E" },
              }}
              fullWidth
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}
