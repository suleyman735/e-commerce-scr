import React,{useEffect} from 'react'
import "./../assests/styles/checkout.css"
import { useTotalPrice } from '../context/TotalPriceContext';


function Checkout({cartItems,calculateTotalPrice}) {
console.log(calculateTotalPrice());

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

      

          <div className="button-procees">
            <a href="/checkout">Place Order</a>
          </div>
        </div>

</div>
    </div>
  )
}

export default Checkout