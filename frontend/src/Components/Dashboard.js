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
  Avatar,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion.create(Card);

// Helper functions to calculate financial totals
function calculateTotalAssets(formData) {
  if (!formData) return "0";

  const assetFields = [
    "primaryResidence",
    "otherRealEstate",
    "retirementAccounts",
    "investmentAccounts",
    "cashAccounts",
  ];

  const total = assetFields.reduce((sum, field) => {
    const value = parseFloat(formData[field]) || 0;
    return sum + value;
  }, 0);

  return total.toLocaleString();
}

function calculateTotalLiabilities(formData) {
  if (!formData) return "0";

  const liabilityFields = [
    "mortgage",
    "carLoans",
    "creditCardDebt",
    "studentLoans",
    "otherDebts",
  ];

  const total = liabilityFields.reduce((sum, field) => {
    const value = parseFloat(formData[field]) || 0;
    return sum + value;
  }, 0);

  return total.toLocaleString();
}

function calculateNetWorth(formData) {
  if (!formData) return "0";

  const totalAssets = calculateTotalAssets(formData).replace(/,/g, "");
  const totalLiabilities = calculateTotalLiabilities(formData).replace(
    /,/g,
    ""
  );

  const netWorth = parseFloat(totalAssets) - parseFloat(totalLiabilities);

  return netWorth.toLocaleString();
}

function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
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
    navigate("/");
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

  // Content for left column
  const LeftColumn = () => (
    <MotionCard
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      elevation={2}
      sx={{ borderRadius: 2, height: "100%" }}
    >
      <CardContent
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" color="primary" gutterBottom>
          Financial Dashboard
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Net Worth Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color="textSecondary"
            gutterBottom
          >
            Net Worth
          </Typography>
          <Typography variant="h5" color="primary">
            ${formData ? calculateNetWorth(formData) : "0.00"}
          </Typography>
        </Box>

        {/* Goals Section */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            fontWeight="medium"
            color="textSecondary"
            gutterBottom
          >
            Financial Goals
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="medium">
              Short Term
            </Typography>
            <LinearProgress
              variant="determinate"
              value={65}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: `${theme.palette.primary.main}15`,
                "& .MuiLinearProgress-bar": {
                  bgcolor: theme.palette.primary.main,
                },
              }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}
            >
              <Typography variant="caption" color="textSecondary">
                Goal: $10,000
              </Typography>
              <Typography variant="caption" color="textSecondary">
                65%
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" fontWeight="medium">
              Long Term
            </Typography>
            <LinearProgress
              variant="determinate"
              value={35}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: `${theme.palette.secondary.main}15`,
                "& .MuiLinearProgress-bar": {
                  bgcolor: theme.palette.secondary.main,
                },
              }}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}
            >
              <Typography variant="caption" color="textSecondary">
                Goal: $100,000
              </Typography>
              <Typography variant="caption" color="textSecondary">
                35%
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Navigation Options */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ justifyContent: "center", textTransform: "none" }}
          >
            Download Investment Report
          </Button>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ justifyContent: "center", textTransform: "none" }}
            onClick={() => navigate("/profile")}
          >
            View Profile
          </Button>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ justifyContent: "center", textTransform: "none" }}
            onClick={handleEditForm}
          >
            Update Financial Info
          </Button>
        </Box>

        {/* Spacer to push logout to bottom */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Logout Button */}
        <Button
          startIcon={<Box component="span" className="material-icons"></Box>}
          variant="contained"
          color="primary"
          onClick={handleLogout}
          fullWidth
          sx={{ justifyContent: "center" }}
        >
          Logout
        </Button>
      </CardContent>
    </MotionCard>
  );

  // Content for top right section
  const TopRightSection = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInvestmentOptionClick = async (optionName) => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          "http://localhost:5000/api/investment-advice",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...userData,
              investmentPreference: optionName,
              formData: formData,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to get investment advice");
        }

        const data = await response.json();
        setLoading(false);
        // You can handle the response here, e.g., show it in a dialog or notification
        console.log("Investment advice:", data.advice);
      } catch (error) {
        console.error("Error getting investment advice:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    return (
      <MotionCard
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        elevation={2}
        sx={{ borderRadius: 2, height: "100%" }}
      >
        <CardContent>
          {error && (
            <Box sx={{ mb: 2, p: 2, bgcolor: "error.light", borderRadius: 1 }}>
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            </Box>
          )}

          {loading && (
            <Box sx={{ width: "100%", mb: 2 }}>
              <LinearProgress />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              color="primary"
              sx={{ mb: 0 }}
            >
              Welcome, {userData?.name || userName || "User"}!
            </Typography>
          </Box>

          <Divider sx={{ mb: 1 }} />

          {/* Investment Options Circles */}
          <Box sx={{ mb: 2, overflowX: "auto" }}>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 0.5,
                fontWeight: "medium",
                color: theme.palette.mode === "light" ? "black" : "white",
              }}
            >
              Investment Options
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                pb: 1,
                minWidth: "max-content",
              }}
            >
              {[
                {
                  name: "Stocks",
                  icon: "https://cdn-icons-png.flaticon.com/512/4222/4222019.png",
                },
                {
                  name: "Bonds",
                  icon: "https://cdn-icons-png.flaticon.com/512/3310/3310624.png",
                },
                {
                  name: "Mutual Funds",
                  icon: "https://cdn-icons-png.flaticon.com/512/3347/3347835.png",
                },
                {
                  name: "ETFs",
                  icon: "https://cdn-icons-png.flaticon.com/512/1006/1006555.png",
                },
                {
                  name: "Real Estate",
                  icon: "https://cdn-icons-png.flaticon.com/512/1670/1670080.png",
                },
                {
                  name: "Commodities",
                  icon: "https://cdn-icons-png.flaticon.com/512/2933/2933116.png",
                },
                {
                  name: "Cryptocurrency",
                  icon: "https://cdn-icons-png.flaticon.com/512/5968/5968260.png",
                },
                {
                  name: "Index Funds",
                  icon: "https://cdn-icons-png.flaticon.com/512/4256/4256900.png",
                },
                {
                  name: "Fixed Deposits",
                  icon: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
                },
                {
                  name: "Private Equity",
                  icon: "https://cdn-icons-png.flaticon.com/512/3135/3135679.png",
                },
              ].map((option) => (
                <Box
                  key={option.name}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                  onClick={() => handleInvestmentOptionClick(option.name)}
                >
                  <Avatar
                    src={option.icon}
                    sx={{
                      bgcolor: "white",
                      width: 70,
                      height: 70,
                      cursor: "pointer",
                      p: 1.5,
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "all 0.2s",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    fontWeight="medium"
                    align="center"
                  >
                    {option.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            Here's a summary of your account status and recent activities.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: `${theme.palette.primary.main}20`,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" color="primary" gutterBottom>
                  {formData ? "Assessment Complete" : "Pending Assessment"}
                </Typography>
                <Typography variant="body2">
                  {formData
                    ? "Your financial profile is up to date."
                    : "Please complete your financial assessment."}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: `${theme.palette.secondary.main}20`,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" color="secondary" gutterBottom>
                  Next Review
                </Typography>
                <Typography variant="body2">
                  Scheduled for {formData ? "June 2023" : "After assessment"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: `${theme.palette.success.main}20`,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.success.main }}
                  gutterBottom
                >
                  Financial Health
                </Typography>
                <Typography variant="body2">
                  {formData ? "Good standing" : "Needs assessment"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </MotionCard>
    );
  };

  // Content for bottom right section
  const BottomRightSection = () => {
    if (!formData) {
      return (
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          elevation={2}
          sx={{ borderRadius: 2, height: "100%" }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              You haven't submitted your financial assessment form yet.
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ maxWidth: "600px", mx: "auto", mb: 4 }}
            >
              To receive personalized financial advice and recommendations,
              please complete your financial assessment form.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditForm}
              size="large"
            >
              Complete Your Assessment
            </Button>
          </CardContent>
        </MotionCard>
      );
    }

    return (
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        elevation={2}
        sx={{ borderRadius: 2, height: "100%" }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom color="primary">
            Your Financial Summary
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" paragraph>
            Based on the information you provided, here's a summary of your
            financial situation.
          </Typography>

          <Grid container spacing={3}>
            {/* Assets Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Assets
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Primary Residence:
                  </Typography>
                  <Typography variant="body1">
                    ${formData.primaryResidence || "0"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Retirement Accounts:
                  </Typography>
                  <Typography variant="body1">
                    ${formData.retirementAccounts || "0"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Investment Accounts:
                  </Typography>
                  <Typography variant="body1">
                    ${formData.investmentAccounts || "0"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Cash Accounts:
                  </Typography>
                  <Typography variant="body1">
                    ${formData.cashAccounts || "0"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Liabilities Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="error">
                Liabilities
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Mortgage:
                  </Typography>
                  <Typography variant="body1">
                    ${formData.mortgage || "0"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Car Loans:
                  </Typography>
                  <Typography variant="body1">
                    ${formData.carLoans || "0"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Credit Card Debt:
                  </Typography>
                  <Typography variant="body1">
                    ${formData.creditCardDebt || "0"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Student Loans:
                  </Typography>
                  <Typography variant="body1">
                    ${formData.studentLoans || "0"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </MotionCard>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8, minHeight: "80vh" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <LeftColumn />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TopRightSection />
            </Grid>
            <Grid item xs={12}>
              <BottomRightSection />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
