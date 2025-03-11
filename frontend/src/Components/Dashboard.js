import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUserName = localStorage.getItem("userName");
    
    setUserName(storedUserName || "");
    
    if (!token) {
      alert("Please log in to access this page");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch user profile
        const userResponse = await fetch("http://localhost:5000/user-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await userResponse.json();

        // Fetch form data
        const formResponse = await fetch(
          "http://localhost:5000/user-form-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (formResponse.ok) {
          const formData = await formResponse.json();
          setFormData(formData.formData);
        }

        setUserData(userData.user);
        
        // If we got a name from the API, update the userName in localStorage
        if (userData.user && userData.user.name) {
          localStorage.setItem("userName", userData.user.name);
          setUserName(userData.user.name);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleEditForm = () => {
    navigate("/form");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" color="error" gutterBottom>
            Error: {error}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            User not found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, mb: 4 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom color="primary">
            Welcome, {userData?.name || userName || "User"}!
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {!formData ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" gutterBottom>
              You haven't submitted your financial assessment form yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditForm}
              sx={{ mt: 2 }}
            >
              Complete Your Assessment
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Your Financial Summary
              </Typography>
              <Typography variant="body1" paragraph>
                Based on the information you provided, here's a summary of your
                financial situation.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleEditForm}
                sx={{ mb: 3 }}
              >
                Edit Your Information
              </Button>
            </Box>

            <Grid container spacing={3}>
              {/* Assets Section */}
              <Grid item xs={12} md={6}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  elevation={2}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                      Assets
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Primary Residence:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.primaryResidence || "0"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Vehicles:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.vehicles || "0"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Investments:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.investments || "0"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Cash & Savings:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.cashSavings || "0"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MotionCard>
              </Grid>

              {/* Liabilities Section */}
              <Grid item xs={12} md={6}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  elevation={2}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="error">
                      Liabilities
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Mortgage:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.mortgage || "0"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Car Loans:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.carLoans || "0"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Credit Card Debt:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.creditCardDebt || "0"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Student Loans:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.studentLoans || "0"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MotionCard>
              </Grid>

              {/* Income Section */}
              <Grid item xs={12} md={6}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  elevation={2}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="success.main">
                      Income
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Monthly Income:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.monthlyIncome || "0"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Annual Income:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.annualIncome || "0"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Additional Income:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.extraIncome || "0"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Monthly Expenses:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          ${formData.monthlyExpenses || "0"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MotionCard>
              </Grid>

              {/* Goals Section */}
              <Grid item xs={12} md={6}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  elevation={2}
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom color="info.main">
                      Financial Goals
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Long-term Goals:
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {formData.financialGoals || "Not specified"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Short-term Goals:
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {formData.shortTermGoals || "Not specified"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Risk Tolerance:
                    </Typography>
                    <Typography variant="body1">
                      {formData.riskTolerance || "Not specified"}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            </Grid>
          </>
        )}
      </MotionPaper>
    </Container>
  );
}

export default Dashboard;
