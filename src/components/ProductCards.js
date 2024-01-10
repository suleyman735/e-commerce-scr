import React,{useState} from 'react'
import './../assests/styles/cards.css'
import imgage1 from './../assests/images/g92-2-500x500 1.png'
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import StarRating from './StarRating';

function ProductCards({product}) {
    const [isHovered, setIsHovered] = useState(false);
console.log(isHovered);

const handleAddToCartClick = () => {
    // Implement your logic for adding the product to the cart
    console.log('Product added to cart:', product.name);
  };

  return (
    <div className="product-card">
        <div className="product" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <div className="img">
                <img src={imgage1} alt="" />
            </div>
            <div className="discount">{product.discount*100 +'%'}</div>
            <div className="likeWacht">
                <div className="like"><CiHeart /></div>
                <div className="watch"><MdOutlineRemoveRedEye/></div>
            </div>
            <div  className={`add-to-cart ${isHovered ? 'active':''}`} onClick={handleAddToCartClick}>Add To Cart{isHovered}</div>
        </div>
        
        <div className="product-detail">
            <div className="title">{product.name}</div>
            <div className="pridis">
                <div className="discount">{product.price-(product.price * product.discount).toFixed(2)}</div>
                <div className="real">${product.price}</div>
                
            </div>
            <div className="star">
                
            <StarRating rating={product.rating} />
            </div>

        </div>
        



    </div>
  )
}

export default ProductCards

      {/* <img src={product.imageUrl} alt={product.name} />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button>Add to Cart</button> */}
      {/* </div> */}