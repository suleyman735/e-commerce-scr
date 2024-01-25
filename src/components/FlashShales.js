import React,{useState,useEffect} from 'react'
import './../assests/styles/flashSale.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ProductCards from './ProductCards';
// import productData from '../constant/product';
import { getProducts } from '../constant/api';



function FlashShales({addToCart}) {
  const [products,setProducts] = useState([])

    const discountedProducts = products.filter(product => product.discount > 0);
    

    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSlides = Math.ceil(discountedProducts.length / 3);
  
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };
    useEffect(() => {

      const fetchData = async () => {
        try {
          const data = await getProducts();
          setProducts(data);
        } catch (error) {
          // Handle error if needed
        }
      };
  
      fetchData();





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
            <div className='title'>Today's</div>


        </div>
        <div className="flashtime" >
            <div className="title">
            Flash Sales
            </div>
            <div className="time">
            <table>
                <tr>
                    <th>Days</th> 
                    <th></th> 
                    <th>Hours</th> 
                    <th></th> 
                    <th>Minutes</th>
                    <th></th> 
                    <th>Seconds</th>
                </tr>
                <tr>
                    <td>03</td>
                    <td className='redCall'>:</td>
                    <td>23</td>
                    <td className='redCall'>:</td>
                    <td>19</td>
                    <td className='redCall'>:</td>
                    <td>56</td>
                </tr>

                </table>
     
            </div>
            <div className="nextprev" >
            <FaArrowLeft  className='prev' onClick={prevSlide} /> <FaArrowRight className='next' onClick={nextSlide}/>

            </div>
        </div>
        <div className="flashCards-container">
        <div className="flashCards" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {discountedProducts.map((product, index) => (
            <ProductCards key={index} product={product} addToCart={addToCart}/>
          ))}
        </div>
      </div>

 
        

      
        <div className="flashButton">
            <div className="button"><a href=""> View All Products</a></div>
       
        </div>


        
              
    </div>

  )
}

export default FlashShales