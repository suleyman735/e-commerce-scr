import React,{useState,useEffect} from 'react'
import './../assests/styles/category.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import phones from "../assests/images/Category-CellPhone.png"
import computer from "../assests/images/Category-Computer.png"
import headphones from "../assests/images/headphones.png"
import gaming from "../assests/images/gaming.png"
import watch from "../assests/images/watch.png"


function Category() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSlides = Math.ceil(4 / 3);
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };
    useEffect(() => {
        // Automatically move to the next slide every 5 seconds (adjust the duration as needed)
        const intervalId = setInterval(() => {
          nextSlide();
        }, 5000);
    
        return () => {
          // Clear the interval when the component is unmounted
          clearInterval(intervalId);
        };
      }, [currentSlide]);


  return (
    <div className='flashSale container' >

    <div className='today'>
        <div className='rectangle'></div>
        <div className='title'>category</div>


    </div>
    <div className="flashtime" >
        <div className="title">
        Browse By Category
        </div>
        <div className="time">

 
        </div>
        <div className="nextprev" >
        <FaArrowLeft  className='prev' onClick={prevSlide} /> <FaArrowRight className='next' onClick={nextSlide}/>

        </div>
    </div>
    <div className="flashCards-container">
    <div className="flashCards" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>

        <div className="cat-box">
            <div className="icon"> <img src={phones} alt="" /> </div>
            <div className="title">Phones</div>
        </div>
        <div className="cat-box">
            <div className="icon"> <img src={computer} alt="" /> </div>
            <div className="title">Computer</div>
        </div>
        <div className="cat-box">
            <div className="icon"> <img src={phones} alt="" /> </div>
            <div className="title">Gaming</div>
        </div>
        <div className="cat-box">
            <div className="icon"> <img src={watch} alt="" /> </div>
            <div className="title">Watch</div>
        </div>
        <div className="cat-box">
            <div className="icon"> <img src={phones} alt="" /> </div>
            <div className="title">Headphones</div>
        </div>
        <div className="cat-box">
            <div className="icon"> <img src={phones} alt="" /> </div>
            <div className="title">Phones</div>
        </div>
        <div className="cat-box">
            <div className="icon"> <img src={phones} alt="" /> </div>
            <div className="title">Phones</div>
        </div>
        <div className="cat-box">
            <div className="icon"> <img src={phones} alt="" /> </div>
            <div className="title">Phones</div>
        </div>


</div>



    {/* <div className="flashCards" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
      {discountedProducts.map((product, index) => (
        <ProductCards key={index} product={product} />
      ))}
    </div> */}
  </div>


    

  
    {/* <div className="flashButton">
        <div className="button"><a href=""> View All Products</a></div>
   
    </div> */}


    
          
</div>
  )
}

export default Category