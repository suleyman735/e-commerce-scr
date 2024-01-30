import React,{useEffect,useState} from 'react'
import "./../assests/styles/checkout.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Checkout({cartItems,calculateTotalPrice}) {
  const [orderData, setOrderData] = useState([cartItems]);
  const orderId = localStorage.getItem("orderId");
  console.log(orderId);
  const navigate = useNavigate();
  // const getOrders
  
  const sendOrderIrems = async (cartItems) => {
    console.log(cartItems);
    try {
      // Get the Bearer token from wherever you store it (e.g., state, context, localStorage)

      const token = localStorage.getItem("access");
      const orderId = localStorage.getItem("orderId");
 
      // Make the POST request using Axios
      const response = await axios.post(
        "http://127.0.0.1:8000/api/order-items/",
        cartItems.map((item) => ({
          qty: item.quantity,
          price: item.price,
          product: item._id, // Assuming you have a productId property in your cart item
          order: orderId, // You may need to adjust this based on your API requirements
        })),

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response as needed
      console.log("Order sent successfully:", response);
      if (response.status===201) {
        // navigate(`/create-checkout-session/${orderId}`);

              // Dynamically create a form
      const form = document.createElement("form");
      form.action = `http://127.0.0.1:8000/api/create-checkout-session/${orderId}/`;
      form.method = "POST";

      // Append the form to the body (you can append it to another element if needed)
      document.body.appendChild(form);

      // Submit the form
      form.submit();

        
      }else{
        console.log("serverr error",response);
       
      }
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };



  useEffect(() => {
    setOrderData(cartItems);
    // setTotalPrice(calculateTotalPrice());
  }, [cartItems]);

  return (
    <div className='container checkout'>

      <div className='billingAddress'>
        <label>FirstName</label>
        <input placeholder='' className='address'/>
        <label>Company Name</label>
        <input placeholder='' className='address'/>
        <label>Street Address</label>
        <input placeholder='' className='address'/>
        <label>Apartment,floor,etc</label>
        <input placeholder='' className='address'/>
        <label>Town/City</label>
        <input placeholder='' className='address'/>
        <label>Number</label>
        <input placeholder='' className='address'/>
        <label>Email address</label>
        <input placeholder='' className='address'/>
        <div className="form-check-label" >
        <input type="checkbox" className='checkbox' />
     
        Save this information for faster check-out next time
        </div>




      </div>
      <div className='pay'>
        <table className="table">
          <tbody>
            {cartItems.map((item,ind)=>(
                          <tr>
                          <td><img src={item.image}/></td>
                          <td>{item.name}</td>
                          <td>{item.quantity*(item.price-item.price*item.discount)}</td>
                        </tr>
            ))}

          </tbody>
        </table>
        <div className="carttotal">
          {/* <div className="title1">Cart Total</div> */}
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
          <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label class="form-check-label" for="flexRadioDefault1">
    Bank
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
  <label class="form-check-label" for="flexRadioDefault2">
    Cash
  </label>
</div>

      

          <div className="button-procees"onClick={()=>{sendOrderIrems(orderData)}} >
          Check for card
   
          </div>
          
            
      
        </div>

</div>
    </div>
  )
}

export default Checkout