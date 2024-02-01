import React,{useState} from 'react'
import './../assests/styles/cards.css'
import imgage1 from './../assests/images/g92-2-500x500 1.png'
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

function ProductCards({product,addToCart}) {
    const [isHovered, setIsHovered] = useState(false);




  

  return (
    <div className="product-card">
        <div className="product" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <div className="img">
                <img src={imgage1} alt="" />
            </div>
           {product.discount && product.discount !==0 ? ( <div className="discount">{product.discount*100 +'%'}</div>):null }
            <div className="likeWacht">
                <div className="like"><CiHeart /></div>
                <div className="watch"><Link to={`/product/${product._id}`}><MdOutlineRemoveRedEye/></Link></div>
            </div>
            <div  className={`add-to-cart ${isHovered ? 'active':''}`} onClick={()=>addToCart(product)}>Add To Cart</div>
        </div>
        
        <div className="product-detail">
            <div className="title">{product.name}</div>
            <div className="pridis">
             {product.discount && product.discount !==0 ?(<><div className="discount">{product.price - (product.price * product.discount).toFixed(2)}</div><div className="real discountHas">${product.price}</div></>) : <div className="real">${product.price}</div> }   
                
                
            </div>
            <div className="star">
                
            <StarRating rating={product.rating} />
            </div>

        </div>
        



    </div>
  )
}

export default ProductCards

