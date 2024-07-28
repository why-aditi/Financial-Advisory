import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className={`parent-container ${isClicked ? "active" : ""}`}>
      <div className={`bgimage ${isClicked ? "active" : ""}`}></div>
      <div className="logo2"></div>
      <div className="home">
        <div className="left-column">
          <div className="space"></div>
          <div className="space"></div>
          <div className="financial space" onClick={handleClick}>
            Financial
          </div>
          <div className="space"></div>
          <div className="space"></div>
        </div>
        <div className="right-column">
          <div className="space"></div>
          <div className="space"></div>
          <div className="advisory space" onClick={handleClick} >
            Advisory
          </div>
          <div className="space"></div>
          <div className="space"></div>
          
        </div>
        <div className={`information-text ${isClicked ? "active" : ""}`}>
                    <div className="col">
                        <h2>A personal financial advisor for everyone</h2>
                        <p>Personal financial advisors shouldn’t be limited to just a select group. We offer financial guidance to everyone, assisting with goal-setting, planning, budgeting, and achieving your financial objectives. </p>
                    </div>
                    <div className="col">
                        <h2>Bridging gaps in wealth and financial literacy</h2>
                        <p>Our mission is to make advanced, personalized financial guidance accessible to everyone and empowering them to navigate their financial journey with confidence.</p>
                    </div>
                    <div className="col">
                        <h2>Onboard digitally and execute your trade orders with the click of a button.</h2>
                        <p>Our platform makes trading simple and efficient, letting you manage your investments effortlessly.</p>
                    </div>
                </div>
      </div>
    </div>
  );
}
