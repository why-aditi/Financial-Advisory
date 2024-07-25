import React from "react";
import { Container, Typography, Box } from "@mui/material";
import "./Forgot.css";

export default function ForgotUserID() {
  return (
    <div className="forgot-box">
      <Container maxWidth="xs">
        <Box className="forgot-box" p={3} boxShadow={3}>
          <Typography variant="h4" gutterBottom>
            Forgot User ID
          </Typography>
          {/* Add form or instructions for recovering User ID */}
          <Typography>
            To recover your User ID, please contact support or follow the
            instructions sent to your email.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
