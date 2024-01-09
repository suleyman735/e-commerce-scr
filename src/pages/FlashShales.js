import React from 'react'
import './../assests/styles/flashSale.css'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ProductCards from '../components/ProductCards';

function FlashShales() {
    const productData = {
        name: 'Sample Product',
        description: 'This is a sample product description.',
        price: 19.99,
        imageUrl: 'https://example.com/sample-image.jpg',
      };
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
            <div className="nextprev">
            <FaArrowLeft  className='prev'/> <FaArrowRight className='next'/>

            </div>
        </div>
        <div className="flashCards">
        <ProductCards product = {productData}/>
        

        </div>
        <div className="flashButton"></div>


        
              
    </div>

  )
}

export default FlashShales