import React from 'react'
import Slider from './Slider'
import "./../assests/styles/side-menu-slider.css";

function SideMenu() {
  return (<>
<div className="side-menu-slider container">
    <div className='side-menu'>
        <ul className='side-container'>
            <li className='side-item'>
                <a href='/' className='side-link'>Women's Fashion</a>
            </li>
            <li className='side-item'>
                <a href='/' className='side-link'>Men's Fashion</a>
            </li>
            <li className='side-item'>
                <a href='/' className='side-link'>Electronics</a>
            </li>
            <li className='side-item'>
                <a href='/' className='side-link'>Home & Lifestyle</a>
            </li>
            <li className='side-item'>
                <a href='/' className='side-link'>Medicine</a>
            </li>
            <li className='side-item'>
                <a href='/' className='side-link'>Suports & Outdoor</a>
            </li>
            <li className='side-item'>
                <a href='/' className='side-link'>Baby's & Toys</a>
            </li>
            <li className='side-item'>
                <a href='/'  className='side-link'>Groceries & Pets</a>
            </li>
            <li className='side-item'> 
                <a href='/' className='side-link'>Health & Beauty</a>
            </li>
        </ul>


    </div>
    <Slider/> 
    </div>
    </>
   
  )
}

export default SideMenu