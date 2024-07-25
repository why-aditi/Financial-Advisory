import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import LogIn from "./Components/LogIn";
import Form from "./Components/Form";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
