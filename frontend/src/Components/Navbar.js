import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  Switch,
  FormControlLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Navbar({ toggleColorMode, mode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const scrollToSection = (sectionId) => {
    // Close drawer if open
    if (drawerOpen) {
      setDrawerOpen(false);
    }

    // If not on home page, navigate to home page with hash
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    // If already on home page, scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  const navItems = [
    { name: "Home", path: "/", action: () => (window.location.href = "/") },
    {
      name: "Services",
      path: "/#services",
      action: () => scrollToSection("services"),
    },
    { name: "About", path: "/#about", action: () => scrollToSection("about") },
    {
      name: "Contact",
      path: "/#contact",
      action: () => scrollToSection("contact"),
    },
  ];

  // Handle hash links when page loads
  useEffect(() => {
    if (isHomePage && location.hash) {
      // Remove the # character
      const sectionId = location.hash.substring(1);

      // Add a small delay to ensure the page is fully loaded
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location, isHomePage]);

  const drawer = (
    <Box sx={{ width: 250, height: "100%" }} role="presentation">
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.name}
            onClick={item.action}
            sx={{ textDecoration: "none" }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        <ListItem>
          <FormControlLabel
            control={
              <Switch
                checked={mode === "dark"}
                onChange={toggleColorMode}
                color="primary"
              />
            }
            label={mode === "dark" ? "Dark Mode" : "Light Mode"}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                }}
              >
                A2K Financial
              </Typography>
            </RouterLink>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  onClick={item.action}
                  sx={{ mx: 1, textDecoration: "none" }}
                >
                  {item.name}
                </Button>
              ))}
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <IconButton onClick={toggleColorMode} color="inherit">
                  {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Box>
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/login"
                sx={{ mr: 1, textDecoration: "none" }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/signup"
                sx={{ textDecoration: "none" }}
              >
                Sign Up
              </Button>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {/* Auth Buttons (Desktop) */}
          {!isMobile && (
            <Box>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/login"
                sx={{ mr: 1, textDecoration: "none" }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/signup"
                sx={{ textDecoration: "none" }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </AppBar>
  );
}
