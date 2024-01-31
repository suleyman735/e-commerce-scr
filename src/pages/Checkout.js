import React,{useEffect,useState} from 'react'
import "./../assests/styles/checkout.css"
import axios from 'axios';



function Checkout({cartItems,calculateTotalPrice}) {
  const [orderData, setOrderData] = useState([cartItems]);
  const orderId = localStorage.getItem("orderId");
  const [formData, setFormData] = useState({
   
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email:'',
    shippingPrice:'',
    orderShipping:orderId,
    
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleSubmit = async (orderId) => {

    const token = localStorage.getItem("access");
    
    try {
      // Adjust the API endpoint according to your server
      const apiUrl = 'http://127.0.0.1:8000/api/shipping/';
      
      // Send the form data using Axios
      const response = await axios.post(apiUrl, formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

      // Handle the response (if needed)
      console.log('API Response:', response.data,
      );

      // Optionally, reset the form or perform other actions
      // setFormData({ ...initialFormData });
    } catch (error) {
      // Handle errors
      console.error('Error sending data:', error);
    }
  };





  // const getOrders
  const sendOrderIrems = async (cartItems) => {
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
      
      if (response.status===201) {
        handleSubmit(orderId);

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
<form method='POST' onSubmit={handleSubmit}>
      <div className='billingAddress'>
        <label>Address</label>
        <input placeholder='' className='address' name='address' value={formData.address}  onChange={handleInputChange}/>
        <label>Apartment</label>
        <input placeholder='' className='address' name='apartment' value={formData.apartment}  onChange={handleInputChange}/>
        <label>City</label>
        <input placeholder='' className='address' name='city' value={formData.city}  onChange={handleInputChange}/>
        <label>PostalCode</label>
        <input placeholder='' className='address' name='postalCode' value={formData.postalCode}  onChange={handleInputChange}/>
        <label>Country</label>
        <input placeholder='' className='address' name='country' value={formData.country}  onChange={handleInputChange}/>
        <label>Phone</label>
        <input placeholder='' className='address' name='phone' value={formData.phone}  onChange={handleInputChange}/>
        <label>Email</label>
        <input placeholder='' className='address' name='email' value={formData.email}  onChange={handleInputChange}/>
        <label>shippingPrice</label>
        <input placeholder='' className='address' name='shippingPrice' value={formData.shippingPrice}  onChange={handleInputChange}/>



      </div>
      <button type='submit'>save address</button>
      </form>
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