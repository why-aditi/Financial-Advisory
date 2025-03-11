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

const MotionCard = motion(Card);

// Global variable to store investment advice data
let data = null;

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
  const [investmentAdvice, setInvestmentAdvice] = useState(null);

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

        // Store the response in the global data variable
        data = await response.json();
        
        // Parse data.advice as JSON and extract fields
        const myObj = JSON.parse(data.advice);
        console.log("Parsed advice data:", myObj);
        
        // Extract data into separate variables in the specified sequence
        const personalizedAdvice = myObj["Personalized Advice"] || "";
        const understandingSituation = myObj["Understanding Your Situation"] || [];
        const prosAndCons = myObj["Pros & Cons for You"] || {};
        const isItRightForYou = myObj["Is it right for you?"] || [];
        const stepByStepStrategy = myObj["Step by step strategy"] || [];
        const nextSteps = myObj["Next steps"] || [];
        const importantConsiderations = myObj["Important Considerations"] || [];
        
        // Log each extracted field for debugging
        console.log("Personalized Advice:", personalizedAdvice);
        console.log("Understanding Your Situation:", understandingSituation);
        console.log("Pros & Cons for You:", prosAndCons);
        console.log("Is it right for you?:", isItRightForYou);
        console.log("Step by step strategy:", stepByStepStrategy);
        console.log("Next steps:", nextSteps);
        console.log("Important Considerations:", importantConsiderations);
        
        // Create adviceData object with extracted fields in the specified sequence
        const adviceData = {
          investmentType: optionName,
          "Personalized Advice": personalizedAdvice,
          "Understanding Your Situation": understandingSituation,
          "Pros & Cons for You": prosAndCons,
          "Is it right for you?": isItRightForYou,
          "Step by step strategy": stepByStepStrategy,
          "Next steps": nextSteps,
          "Important Considerations": importantConsiderations
        };
        
        setLoading(false);
        setInvestmentAdvice(adviceData);
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
                mb: 2,
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

          {/* <Typography variant="body1" paragraph>
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
          </Grid> */}
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
            >
              Complete Assessment
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
          {investmentAdvice ? (
            <>
              <Typography 
                variant="h5" 
                color="primary" 
                gutterBottom
                sx={{ 
                  fontWeight: 500,
                  mb: 2,
                  borderBottom: `1px solid ${theme.palette.primary.light}`,
                  pb: 1
                }}
              >
                Investment Recommendations for {investmentAdvice.investmentType}
              </Typography>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  bgcolor: theme.palette.mode === 'light' ? 'rgba(25, 118, 210, 0.05)' : 'rgba(99, 102, 241, 0.05)',
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(25, 118, 210, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
                }}
              >
                
                {/* Personalized Advice Section */}
                {investmentAdvice["Personalized Advice"] && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      gutterBottom
                    >
                      Personalized Advice
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {investmentAdvice["Personalized Advice"]}
                    </Typography>
                  </Box>
                )}
                
                {/* Understanding Your Situation Section */}
                {investmentAdvice["Understanding Your Situation"] && investmentAdvice["Understanding Your Situation"].length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      gutterBottom
                    >
                      Understanding Your Situation
                    </Typography>
                    <Box component="ul" sx={{ pl: 4 }}>
                      {Array.isArray(investmentAdvice["Understanding Your Situation"]) ? (
                        investmentAdvice["Understanding Your Situation"].map((situation, index) => (
                          <Box component="li" key={index} sx={{ mb: 0.5 }}>
                            <Typography variant="body1">{situation}</Typography>
                          </Box>
                        ))
                      ) : (
                        <Box component="li" sx={{ mb: 0.5 }}>
                          <Typography variant="body1">{investmentAdvice["Understanding Your Situation"]}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
                
                {/* Pros & Cons Section */}
                {investmentAdvice["Pros & Cons for You"] && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      gutterBottom
                    >
                      Pros & Cons for You
                    </Typography>
                    
                    {/* Check if Pros & Cons is an object with Pros and Cons properties */}
                    {investmentAdvice["Pros & Cons for You"].Pros && (
                      <>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                          Pros:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
                          {Array.isArray(investmentAdvice["Pros & Cons for You"].Pros) ? (
                            investmentAdvice["Pros & Cons for You"].Pros.map((pro, index) => (
                              <Box component="li" key={index} sx={{ mb: 0.5 }}>
                                <Typography variant="body1">{pro}</Typography>
                              </Box>
                            ))
                          ) : (
                            <Box component="li" sx={{ mb: 0.5 }}>
                              <Typography variant="body1">{investmentAdvice["Pros & Cons for You"].Pros}</Typography>
                            </Box>
                          )}
                        </Box>
                      </>
                    )}
                    
                    {investmentAdvice["Pros & Cons for You"].Cons && (
                      <>
                        <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                          Cons:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4 }}>
                          {Array.isArray(investmentAdvice["Pros & Cons for You"].Cons) ? (
                            investmentAdvice["Pros & Cons for You"].Cons.map((con, index) => (
                              <Box component="li" key={index} sx={{ mb: 0.5 }}>
                                <Typography variant="body1">{con}</Typography>
                              </Box>
                            ))
                          ) : (
                            <Box component="li" sx={{ mb: 0.5 }}>
                              <Typography variant="body1">{investmentAdvice["Pros & Cons for You"].Cons}</Typography>
                            </Box>
                          )}
                        </Box>
                      </>
                    )}
                    
                    {/* If Pros & Cons is not an object with Pros and Cons properties, display it as is */}
                    {!investmentAdvice["Pros & Cons for You"].Pros && !investmentAdvice["Pros & Cons for You"].Cons && (
                      <Typography variant="body1" paragraph>
                        {typeof investmentAdvice["Pros & Cons for You"] === 'string' 
                          ? investmentAdvice["Pros & Cons for You"] 
                          : JSON.stringify(investmentAdvice["Pros & Cons for You"], null, 2)}
                      </Typography>
                    )}
                  </Box>
                )}
                
                {/* Is it Right for You Section */}
                {investmentAdvice["Is it right for you?"]  && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      gutterBottom
                    >
                      Is it Right for You?
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {Array.isArray(investmentAdvice["Is it right for you?"]) 
                        ? investmentAdvice["Is it right for you?"][0] 
                        : investmentAdvice["Is it right for you?"]}
                    </Typography>
                  </Box>
                )}
                
                {/* Step by Step Strategy Section */}
                {investmentAdvice["Step by step strategy"] && investmentAdvice["Step by step strategy"].length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      gutterBottom
                    >
                      Step by Step Strategy
                    </Typography>
                    <Box component="ol" sx={{ pl: 4 }}>
                      {Array.isArray(investmentAdvice["Step by step strategy"]) ? (
                        investmentAdvice["Step by step strategy"].map((step, index) => (
                          <Box component="li" key={index} sx={{ mb: 0.5 }}>
                            <Typography variant="body1">{step}</Typography>
                          </Box>
                        ))
                      ) : (
                        <Box component="li" sx={{ mb: 0.5 }}>
                          <Typography variant="body1">{investmentAdvice["Step by step strategy"]}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
                
                {/* Next Steps Section */}
                {investmentAdvice["Next steps"] && investmentAdvice["Next steps"].length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      gutterBottom
                    >
                      Next Steps
                    </Typography>
                    <Box component="ol" sx={{ pl: 4 }}>
                      {Array.isArray(investmentAdvice["Next steps"]) ? (
                        investmentAdvice["Next steps"].map((step, index) => (
                          <Box component="li" key={index} sx={{ mb: 0.5 }}>
                            <Typography variant="body1">{step}</Typography>
                          </Box>
                        ))
                      ) : (
                        <Box component="li" sx={{ mb: 0.5 }}>
                          <Typography variant="body1">{investmentAdvice["Next steps"]}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
                
                {/* Important Considerations Section */}
                {investmentAdvice["Important Considerations"] && investmentAdvice["Important Considerations"].length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      fontWeight="600" 
                      gutterBottom
                    >
                      Important Considerations
                    </Typography>
                    <Box component="ul" sx={{ pl: 4 }}>
                      {Array.isArray(investmentAdvice["Important Considerations"]) ? (
                        investmentAdvice["Important Considerations"].map((consideration, index) => (
                          <Box component="li" key={index} sx={{ mb: 0.5 }}>
                            <Typography variant="body1">{consideration}</Typography>
                          </Box>
                        ))
                      ) : (
                        <Box component="li" sx={{ mb: 0.5 }}>
                          <Typography variant="body1">{investmentAdvice["Important Considerations"]}</Typography>
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
                
                {/* If no structured data is available, display raw data */}
                {!investmentAdvice["Personalized Advice"] && 
                 !investmentAdvice["Understanding Your Situation"] && 
                 !investmentAdvice["Pros & Cons for You"] && 
                 !investmentAdvice["Is it right for you?"] && 
                 !investmentAdvice["Step by step strategy"] && 
                 !investmentAdvice["Next steps"] && 
                 !investmentAdvice["Important Considerations"] && 
                 data && data.advice && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                      {typeof data.advice === 'string' 
                        ? data.advice 
                        : JSON.stringify(data.advice, null, 2)}
                    </Typography>
                  </Box>
                )}
              </Paper>
              
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="primary"
                  onClick={() => setInvestmentAdvice(null)}
                >
                  New Recommendation
                </Button>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                textAlign: "center",
                py: 4,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Get Investment Advice
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ maxWidth: "600px", mx: "auto", mb: 2 }}
              >
                Select any investment option from the icons above to receive personalized
                investment advice and recommendations based on your financial profile.
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ maxWidth: "500px" }}
              >
                Our system will analyze your financial data and provide tailored advice
                for your selected investment type.
              </Typography>
            </Box>
          )}
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
