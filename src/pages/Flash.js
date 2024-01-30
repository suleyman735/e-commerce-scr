import React, { useEffect,useState } from 'react'
import ProductCards from '../components/ProductCards'


import './../assests/styles/flash.css'
import { getProducts } from '../constant/api';

function Flash({addToCart}) {
  const [products,setProducts] = useState([])



    const discountedProducts = products.filter(product => product.discount > 0);


    useEffect(()=>{

      const fetchData = async () => {
        try {
          const data = await getProducts();
          setProducts(data);
        } catch (error) {
          // Handle error if needed
        }
      };
  
      fetchData();



    },[])




  return (
    <div className='container'>
 
        <div className='flash'>
                {discountedProducts.map((product, index) => (
            <ProductCards key={index} product={product}  addToCart={addToCart} />
          ))}
          </div>
          </div>
  
  )
}

export default Flash