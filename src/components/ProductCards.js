import React,{useState} from 'react'
import './../assests/styles/cards.css'
import imgage1 from './../assests/images/g92-2-500x500 1.png'
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import StarRating from './StarRating';

function ProductCards({product,addToCart}) {
    const [isHovered, setIsHovered] = useState(false);



// const handleAddToCartClick = (item) => {
//     // Implement your logic for adding the product to the cart
//     // setCart(product)
//     // console.log('Product added to cart:', product._id);
//   };
//   const handleChange = (item, d) =>{
//     let ind = -1;
//     cart.forEach((data, index)=>{
//         if (data.id === item.id)
//             ind = index;
//     });
  
//     const tempArr = cart;
//     tempArr[ind].amount += d;
    
//     if (tempArr[ind].amount === 0)
//         tempArr[ind].amount = 1;
//     setCart([...tempArr])
// }
  

  return (
    <div className="product-card">
        <div className="product" onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <div className="img">
                <img src={imgage1} alt="" />
            </div>
           {product.discount && product.discount !==0 ? ( <div className="discount">{product.discount*100 +'%'}</div>):null }
            <div className="likeWacht">
                <div className="like"><CiHeart /></div>
                <div className="watch"><MdOutlineRemoveRedEye/></div>
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

      {/* <img src={product.imageUrl} alt={product.name} />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button>Add to Cart</button> */}
      {/* </div> */}