import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("authToken", data.token);
        alert(data.msg);
        if (data.msg === "User registered successfully") {
          navigate("/form");
        }
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up");
    }
  };

  return (
    <div className="signup-container">
      <Container maxWidth="xs">
        <Box className="signup-box" p={3} boxShadow={3}>
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSignup}>
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
