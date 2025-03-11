import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import ForgotPass from "./Components/ForgotPass";
import ForgotUserID from "./Components/ForgotId";
import Form from "./Components/Form";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/form" element={<Form />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/forgot-user-id" element={<ForgotUserID />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
