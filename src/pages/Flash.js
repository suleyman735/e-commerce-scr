import React from 'react'
import ProductCards from '../components/ProductCards'
import productData from './../constant/product';
import './../assests/styles/flash.css'

function Flash() {
    const discountedProducts = productData.filter(product => product.discount > 0);
  return (
    <div className='container'>
 
        <div className='flash'>
                {discountedProducts.map((product, index) => (
            <ProductCards key={index} product={product} />
          ))}
          </div>
          </div>
  
  )
}

export default Flash