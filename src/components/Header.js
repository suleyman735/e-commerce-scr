import React, { useState } from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  LinkContainer,
  
  Row,
  Col,
} from "react-bootstrap";
import "./../assests/styles/header.css";
import Dropdown from "react-bootstrap/Dropdown";
import { FaSearch } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { CiHeart } from "react-icons/ci";



function Header() {
  const [selectedOption, setSelectedOption] = useState("en");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <header>
      <div className="topbar">
        <div className="head">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <a href="/">ShopNow</a>
        </div>
        <div className="language">
          <select
            id="dropdown"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            
            <option value="en">English</option>
            <option value="rus">Russian</option>
            <option value="it">Italian</option>
          </select>

          {/* {selectedOption && <p>You selected: {selectedOption}</p>} */}
        </div>
      </div>

      <div className="container-inline">
        <div className="navbar-container">
          <div className="navbar-brand">Exclusive</div>
          <div className="navbar-menu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link">
                  Sign up
                </a>
              </li>
            </ul>
          </div>
          <div className="container-end">
            <div className="search-container">
              <input type="text" className="search-input" placeholder="What are you looking for?" />
              
              <FaSearch className="search-icon"/>
              </div>

              <div className="whilistcheckout">
                <button className="cart-button" >
              <CiHeart href="" className="icons"/>
              <span className="counter">{0}</span>
              </button>
              <button className="cart-button" >
        <MdShoppingCartCheckout className="icons" />
        <span className="counter">{1}</span>
      </button>
              {/* <MdShoppingCartCheckout  className="icons"/> */}
              </div>
              
               
            
          </div>
        </div>
      </div>
      

      {/* <div className="navbar">
        <div className="container">
          <div className="navbar-container">
            <div className="navbar-brand">Exclusive</div>
            <div className="navbar-menu">

1
            </div>
          </div>
        </div>
      </div> */}
  
    </header>
  );
}

export default Header;
