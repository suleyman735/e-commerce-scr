import React,{useState} from 'react'
import './../assests/styles/cards.css'
import imgage1 from './../assests/images/g92-2-500x500 1.png'
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function ProductCards({product}) {
    const [isHovered, setIsHovered] = useState(false);
console.log(isHovered);

  return (
    <div className="product-card">
        <div className="product" onMouseOver={() => setIsHovered(true)} >
            <div className="img">
                <img src={imgage1} alt="" />
            </div>
            <div className="discount">20</div>
            <div className="likeWacht">
                <div className="like"><CiHeart /></div>
                <div className="watch"><MdOutlineRemoveRedEye/></div>
            </div>
            <div  className={`add-to-cart active ${isHovered ? 'active':''}`}>Add To Cart{isHovered}</div>
        </div>
        
        <div className="product-detail">
            <div className="title">HAVIT HV-G92 Gamepad</div>
            <div className="pridis">
                <div className="discount">$120</div>
                <div className="real">$160</div>
                
            </div>
            <div className="star">1</div>

        </div>
        


      {/* <img src={product.imageUrl} alt={product.name} />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button>Add to Cart</button> */}
      {/* </div> */}
    </div>
  )
}

export default ProductCards