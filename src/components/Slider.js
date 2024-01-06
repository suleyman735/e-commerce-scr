import React from "react";
import "./../assests/styles/slider.css";
import { FaApple } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import slideImg from "./../assests/images/slideimg1.png";

function Slider() {
  return (
    <div className="slider-container">
      <div className="slider-line">
        <div className="slider-information">
          <div className="modelIconName">
            <FaApple className="models-icon" />
            <div className="model-name">iPhone 14 Series</div>
          </div>
          <div className="voucher">
            <p>Up to 10% off Voucher</p>
          </div>
          <div className="shopNow">
            <a href="/">ShopNow </a> <FaArrowRight className="shopNowIcon" />
          </div>
        </div>
        <div className="slider-image">
          <img src={slideImg} alt="images" />
        </div>
      </div>
      <div className="slider-button">
        <div></div>
        <div></div>
        <div className="active"></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Slider;
