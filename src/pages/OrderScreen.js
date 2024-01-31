import React,{useEffect, useState} from 'react'
import axios from 'axios'

function OrderScreen() {
  const [order,setOrder] = useState([])

  const fetchData = async () => {
    const token = localStorage.getItem("access");
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/orders/',
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setOrder(response.data)
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // fetchData()
  useEffect(()=>{
    fetchData()
  },[])
  
  // fetchData();

  return (
    <div className='container'>

<table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Users</th>
      <th scope="col">Orders</th>
      <th scope="col">OrdersItems -qty - price -pro</th>
      <th scope="col">Payment</th>
    </tr>
  </thead>
  <tbody>
    {order.map((items)=>(
    <tr>
    <th scope="row">{items._id}</th>
    <td>{items.user.email}</td>
    <td>{items.totalPrice}</td>
    <td>
      {items.order.map((e)=>(
      <tr>
      <td>
{e.qty}
      </td>
      <td>
{e.price}
      </td>
      <td>
{e.product}-pro
      </td>
    </tr>
      ))}



    </td>
    <td>{items.payment_history.map((e)=>e.payment_status.toString())}</td>
  </tr>
    ))}

    
  </tbody>
</table>

    </div>
  )
}

export default OrderScreen