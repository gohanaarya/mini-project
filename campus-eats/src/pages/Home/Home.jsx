import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import bgImage from "../../images/trans_bg.jpg";
import rotating from "../../images/rotating.png";
import Canteens from "../Canteens/Canteens";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const canteensRef = useRef(null);
  
  const handleScrollToCanteens = () => {
    console.log(canteensRef.current)
    if (canteensRef.current) {
      canteensRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.60)), url(${bgImage})`,
      }}
    >
      <div className="heros">
        <div className="hero">
          <h1>Enjoy Our Delicious Campus Meals</h1>
          <p>
            Quick, healthy, and tasty food delivered right to your classroom. No
            more long lines — just fresh meals on time.
          </p>
          <button className="cta-button" onClick={handleScrollToCanteens}>
            Explore Menu
          </button>
        </div>
        <div className="rotating-image">
          <img src={rotating} alt="" />
        </div>
      </div>

      {/* Ref to scroll to this section */}
      <div ref={canteensRef}>
        <Canteens />
      </div>
    </div>
  );
};

export default Home;
