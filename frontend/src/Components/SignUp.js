import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    setEmail("");
    navigate("/form");
  };

  return (
    <div className="signup-container">
      <Container maxWidth="xs">
        <Box className="signup-box" p={3} boxShadow={3}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
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
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#F15400",
                "&:hover": { backgroundColor: "#00248E" },
              }}
              fullWidth
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}
