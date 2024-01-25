import React,{useState} from "react";
import "./../assests/styles/slider.css";
import { FaApple } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import slideImg from "./../assests/images/slideimg1.png";
import slideImg1 from "./../assests/images/slideimg1.png";
// import './../assests/images/';

const sliderObjects = {
  images1:{
    url: slideImg,
    name: 'Iphone 12',
    discountPrice: 20,
  },
  image2: {
    url: 'https://placekitten.com/800/401',
    name:'Ophone max 15',
    discountPrice: 15,
  },
  image3: {
    url: 'https://placekitten.com/800/402',
    name: 'Iphone 15',
    discountPrice: 30,
  },
}

function Slider() {
  const [currentIndex, setCurrentIndex] = useState('images1');
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  const currentImageData = sliderObjects[currentIndex];


  return (
    <div className="slider-container">
      <div className="slider-line">
        <div className="slider-information">
          <div className="modelIconName">
            <FaApple className="models-icon" />
            <div className="model-name">{currentImageData.name}</div>
          </div>
          <div className="voucher">
            <p>Up to {currentImageData.discountPrice}% off Voucher</p>
          </div>
          <div className="shopNow">
            <a href="/">ShopNow </a> <FaArrowRight className="shopNowIcon" />
          </div>
        </div>
        <div className="slider-image">
          <img src={  currentImageData.url} alt="images" width='496px' height='330px'/>
        </div>
      </div>
      <div className="slider-button">
        {Object.keys(sliderObjects).map((index)=>(
          <div key={index}  className={`${index === currentIndex ? 'active':''}`}
          onClick={()=> handleDotClick(index)}
          ></div>

        ))}

      </div>
    </div>
  );
}

export default Slider;
