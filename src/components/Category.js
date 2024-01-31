import React,{useState,useEffect} from 'react'
import './../assests/styles/category.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import phones from "../assests/images/Category-CellPhone.png"
import computer from "../assests/images/Category-Computer.png"
import headphones from "../assests/images/headphones.png"
import gaming from "../assests/images/gaming.png"
import watch from "../assests/images/watch.png"
import { Link } from 'react-router-dom';
import ProductScreen from '../pages/ProductScreen';
import axios from 'axios';


function Category() {
    const [currentSlide, setCurrentSlide] = useState(0);
      // State to store the data fetched from the API
  const [data, setData] = useState([]);

    const totalSlides = Math.ceil(4 / 3);
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };


    const getCategory = ()=>{
      axios.get('http://127.0.0.1:8000/api/category/')
      .then(response => {
        // Handle the successful response
        setData(response.data);

    
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
    }


    const startInterval = () => {
      // Automatically move to the next slide every 5 seconds (adjust the duration as needed)
      const intervalId = setInterval(() => {
        nextSlide();
      }, 5000);
    
      return intervalId;
    };
    
useEffect(()=>{
  getCategory()
},[])
  
    useEffect(() => {
      
        // Automatically move to the next slide every 5 seconds (adjust the duration as needed)
        const intervalId = startInterval()
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

      {data.map((item)=>(
        
                <div className="cat-box">
                <div className="icon"> <img src={item.image} alt="" /></div>
                <div className="title"><Link to={`/products/${item.id}`}>{item.name}</Link></div>
            </div>
      ))}

       


</div>

  </div>        
</div>
  )
}

export default Category