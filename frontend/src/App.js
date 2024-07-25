import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import LogIn from "./Components/LogIn";
import ForgotPass from "./Components/ForgotPass";
import ForgotUserID from "./Components/ForgotId";
import Form from "./Components/Form"; // Corrected import

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/form" element={<Form />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/forgot-user-id" element={<ForgotUserID />} />
      </Routes>
    </Router>
  );
}

export default App;
