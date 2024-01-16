import React,{useState} from "react";
import "./../assests/styles/account.css";
import EditProfile from "../components/EditProfile";
import Address from "../components/Address";
import PaymentOption from "../components/PaymentOption";

function Account() {
    const [selectedItem, setSelectedItem] = useState('edit');

    const handleItemClick = (item) => {
      setSelectedItem(item);
    };
  
  return (
    <div className="container account">
      <div className="welcome">
        WELCOME <div>SUL</div>
      </div>
      <div className="main-section">
        <div className="manage-links">
          <div className="my-account">
            <label>Manage My Account</label>
            <ul>
              <li  onClick={() => setSelectedItem('edit')}
          className={selectedItem === 'edit' ? 'active' : ''}>
              
                  My Profile
                
              </li>
              <li onClick={() => setSelectedItem('address')}
          className={selectedItem === 'address' ? 'active' : ''}>
                My Address
              </li>
              <li onClick={() => setSelectedItem('payment')}
          className={selectedItem === 'payment' ? 'active' : ''}>
                My Payment Options
              </li>
            </ul>
          </div>
          <div className="my-orders">
            <label>Manage My Orders</label>
            <ul>
            <li onClick={() => setSelectedItem('returns')}
          className={selectedItem === 'returns' ? 'active' : ''}>
              My Returns
            </li>
            <li onClick={() => setSelectedItem('cancell')}
          className={selectedItem === 'cancell' ? 'active' : ''}>
              My Cancellation
            </li>
            </ul>
          </div>
          <div className="my-wishlist">
            <label>Manage My Wishlist</label>
          </div>
        </div>
        <div className="edit-profile">
       
       {selectedItem === 'edit' && <EditProfile />}
        {selectedItem === 'address' && <Address />}
        {selectedItem === 'payment' && <PaymentOption />}
        
        </div> 
      </div>
    </div>
  );
}

export default Account;
