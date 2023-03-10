import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import photo1 from "../../assets/splash-pic-1.jpg";
import photo2 from "../../assets/splash-pic-2.jpg";
import photo3 from "../../assets/splash-pic-3.jpg";
import photo4 from "../../assets/splash-pic-4.jpg";
import photo5 from "../../assets/splash-pic-5.jpg";
import "./index.css";

function SplashPage() {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [show, setShow] = useState(false);
  const photos = [photo1, photo2, photo3, photo4, photo5];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => {
        return (prevIndex + 1) % photos.length;
      });
    }, 3900);
    return () => clearInterval(interval);
  }, [photos.length]);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, [backgroundIndex]);

  return (
    <div className="splash-page-background-container">
      <img
        className={`splash-page-background ${show ? "active" : ""}`}
        src={photos[backgroundIndex]}
        alt="background"
      ></img>
      <div className="splash-page-text-container">
        <div className="splash-title">Find your inspiration.</div>
        <div className="splash-text">
          Join the Clickr community, home to tens of billions of
        </div>
        <div className="splash-text">photos and 2 million groups.</div>
        <NavLink to="/login" className="get-started-btn">
          Start for free
        </NavLink>
      </div>
    </div>
  );
}

export default SplashPage;
