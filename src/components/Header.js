import React from 'react'
import {Navbar,Container ,NavDropdown,Nav,LinkContainer} from 'react-bootstrap'
import './../assests/styles/header.css'
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
  return (
    <header>
 
    <div className='container-inline topHead'>
      <div>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!<Navbar.Brand href='' className="custom-navbar-brand">ShopNow</Navbar.Brand>     

          </div>        
          <Nav className='language'>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="En"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">En</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
      
            </NavDropdown>
          </Nav>


    </div>

    </header>



    
  )
}

export default Header