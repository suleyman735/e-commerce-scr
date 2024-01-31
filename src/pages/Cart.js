import React, { useEffect, useState } from "react";
import "./../assests/styles/cart.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Cart({
  cartItems,
  removeFromCart,
  updateQuantity,
  calculateTotalPrice,
}) {

  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [orderData, setOrderData] = useState([cartItems]);
  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log(orderData.map((e) => console.log(e._id)));

  // console.log(cartItems);
  const sendOrderIrems = async (cartItems) => {
    console.log(cartItems);
    try {
      // Get the Bearer token from wherever you store it (e.g., state, context, localStorage)

      const token = localStorage.getItem("access");

      // Make the POST request using Axios
      const response = await axios.post(
        "http://127.0.0.1:8000/api/order-items/",
        cartItems.map((item) => ({
          qty: item.quantity,
          price: item.price,
          product: item._id, // Assuming you have a productId property in your cart item
          order: 1, // You may need to adjust this based on your API requirements
        })),

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response as needed
      console.log("Order sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  const sendOrdersTotal=async()=>{
    const token = localStorage.getItem("access");
    const userId = localStorage.getItem("userId");
    console.log(userId);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/orders/",
    {
        
        taxPrice: "34.00",
        totalPrice: calculateTotalPrice(),
        createdAt: "2024-01-29T13:06:04.734712Z",
        user: userId
    },


      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const orderId = response.data._id;
    localStorage.setItem('orderId', orderId);

    console.log("Order sent successfully:", response.data._id);

    navigate(`/checkout`);
    } catch (error) {
      console.error("Error sending order:", error);
      
    }

  }


  useEffect(() => {
    setOrderData(cartItems);
    // setTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  return (
    <div className="container cart">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr>
              <td scope="row">
                <img src={item.image} alt="img" />
                {item.name}
              </td>
              <td>
                $
                {item.price * item.quantity -
                  item.price * item.quantity * item.discount}
              </td>
              <td className="plusMinusBtn">
                <div className="itemCount">{item.quantity}</div>
                <div className="buttonic">
                  <div
                    className="btno"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <FaAngleUp className="icon" />
                  </div>

                  <div
                    className="btno"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    <FaAngleDown className="icon" />
                  </div>
                </div>
                {/* <input type="number" /> */}
              </td>
              <td>
                {item.quantity * item.price -
                  item.discount * item.price * item.quantity}
              </td>
              <td>
                <button onClick={() => removeFromCart(item._id)}>Delete</button>
              </td>
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
          <div className="button-procees" sendOrdersTotal onClick={sendOrdersTotal}>
            <a href="/checkout">Procees to checkout</a>
          </div>
        </div>
      </div>
    </div>
  );
}
// sendOrderIrems(orderData