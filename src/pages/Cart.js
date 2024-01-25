import React, { useEffect } from "react";
import "./../assests/styles/cart.css"
import { FaAngleDown,FaAngleUp } from "react-icons/fa";

export default function Cart({   cartItems, removeFromCart, updateQuantity }) {


    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity -item.price*item.quantity*item.discount, 0);
      };

    // const handlePrice = ()=>{
    //     let ans = 0;
    //     cart.map((item)=>(
    //       ans+=  item.price
    //     ))
    //     setPrice(ans)
    // }

    // const handleremove = (id) => {
    //     const ar = cart.filter((item)=>item.id !==id);
    //     setCart(ar)
    //     // handlePrice()
 
    //   };

    useEffect(()=>{
        // handlePrice()

    },[])




  return (
    <div className="container cart">
      <table class="table ">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody >
          {cartItems.map((item) => (
            <tr>
              <td scope="row">
                <img src={item.image} alt="img" />
                {item.name}
              </td>
              <td>${item.price*item.quantity-item.price*item.quantity*item.discount}</td>
              <td className="plusMinusBtn">
              <div className="itemCount">{item.quantity}</div>
              <div className="buttonic">
                <div className="btno" onClick={()=>updateQuantity(item._id, item.quantity + 1)}><FaAngleUp className="icon"/></div>
                
                <div className="btno" onClick={()=>updateQuantity(item._id, item.quantity - 1)}><FaAngleDown className="icon"/></div>
                </div>
                {/* <input type="number" /> */}
              </td>
              <td>{item.quantity * item.price-item.discount*item.price*item.quantity }</td>
              <td><button onClick={()=>removeFromCart(item._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="section-button">
        <div className="">
          <button>Return To Shop</button>
        </div>
        <div className="">
          <button>Update Cart</button>
        </div>
      </div> */}
      <div className="container totalend">
        <div className="cupon">
            <input placeholder="Coupon Code" />
            <buton className="coupBtn">Apply Coupon</buton>
        </div>
        <div className="carttotal">
            <div className="title1">Cart Total</div>
            {/* <div className="subtotal">
                <div className="title">Subtotal</div>
                <div className="price"> $ {calculateTotalPrice()}</div>
            </div> */}
            <div className="subtotal">
                <div className="title">Shipping </div>
                <div className="price"> Free</div>
            </div>
            <div className="subtotal">
                <div className="title"> Total </div>
                <div className="price">${calculateTotalPrice()}</div>
            </div>
            <div className="button-procees">Procees to checkout</div>
         
        </div>
      </div>
    </div>
  );
}
