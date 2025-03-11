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
      sx={{ 
        height: "100%", 
        borderRadius: 2,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom color="primary">
            Quick Navigation
          </Typography>
          <Divider />
        </Box>
        
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 'auto' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleEditForm}
            fullWidth
          >
            Update Financial Info
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => navigate('/profile')}
            fullWidth
          >
            View Profile
          </Button>
          <Button 
            variant="outlined" 
            color="secondary"
            fullWidth
          >
            Financial Reports
          </Button>
          <Button 
            variant="outlined" 
            color="info"
            fullWidth
          >
            Messages
          </Button>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 2 }} />
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleLogout}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </CardContent>
    </MotionCard>
  );

  // Content for top right section
  const TopRightSection = () => (
    <MotionCard
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      elevation={2}
      sx={{ borderRadius: 2, height: "100%" }}
    >
      <CardContent>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}>
          <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 0 }}>
            Welcome, {userData?.name || userName || "User"}!
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          Here's a summary of your account status and recent activities.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ 
              p: 2, 
              bgcolor: `${theme.palette.primary.main}20`, 
              borderRadius: 2,
              textAlign: 'center'
            }}>
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
            <Box sx={{ 
              p: 2, 
              bgcolor: `${theme.palette.secondary.main}20`, 
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="h6" color="secondary" gutterBottom>
                Next Review
              </Typography>
              <Typography variant="body2">
                Scheduled for {formData ? "June 2023" : "After assessment"}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ 
              p: 2, 
              bgcolor: `${theme.palette.success.main}20`, 
              borderRadius: 2,
              textAlign: 'center'
            }}>
              <Typography variant="h6" sx={{ color: theme.palette.success.main }} gutterBottom>
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
          <CardContent sx={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center",
            height: "100%",
            textAlign: "center"
          }}>
            <Typography variant="h5" gutterBottom>
              You haven't submitted your financial assessment form yet.
            </Typography>
            <Typography variant="body1" paragraph sx={{ maxWidth: "600px", mx: "auto", mb: 4 }}>
              To receive personalized financial advice and recommendations, please complete your financial assessment form.
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
            Based on the information you provided, here's a summary of your financial situation.
          </Typography>
          
          <Grid container spacing={3}>
            {/* Assets Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="primary">
                Assets
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Primary Residence:</Typography>
                  <Typography variant="body1">${formData.primaryResidence || "0"}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Retirement Accounts:</Typography>
                  <Typography variant="body1">${formData.retirementAccounts || "0"}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Investment Accounts:</Typography>
                  <Typography variant="body1">${formData.investmentAccounts || "0"}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Cash Accounts:</Typography>
                  <Typography variant="body1">${formData.cashAccounts || "0"}</Typography>
                </Box>
              </Box>
            </Grid>

            {/* Liabilities Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom color="error">
                Liabilities
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Mortgage:</Typography>
                  <Typography variant="body1">${formData.mortgage || "0"}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Car Loans:</Typography>
                  <Typography variant="body1">${formData.carLoans || "0"}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Credit Card Debt:</Typography>
                  <Typography variant="body1">${formData.creditCardDebt || "0"}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="textSecondary">Student Loans:</Typography>
                  <Typography variant="body1">${formData.studentLoans || "0"}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </MotionCard>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3} sx={{ height: { md: 'calc(100vh - 180px)', minHeight: '600px' } }}>
        {/* Left Column - 1 part of the 1:4 ratio */}
        <Grid item xs={12} md={3}>
          <LeftColumn />
        </Grid>

        {/* Right Column - 4 parts of the 1:4 ratio */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3} sx={{ height: '100%' }}>
            {/* Top Row */}
            <Grid item xs={12} sx={{ height: { md: '30%' } }}>
              <TopRightSection />
            </Grid>
            
            {/* Bottom Row */}
            <Grid item xs={12} sx={{ height: { md: '70%' } }}>
              <BottomRightSection />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
