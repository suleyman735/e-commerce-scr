import React, { useEffect, useState } from 'react'
import ProductCards from '../components/ProductCards'


import { useParams } from 'react-router-dom';

import { getProducts } from '../constant/api';


export default function ProductScreen({addToCart}) {
    const { category} = useParams();
    const [products,setProducts] = useState([])
    

    // const getProducts=(category)=>{
    //     axios.get('http://127.0.0.1:8000/api/products/')
    //     .then(response =>  {
    //       // Handle the successful response
    //       setProducts(response.data)
          
    // }
    //     )
    //     .catch(error => {
    //       // Handle errors
    //       console.error('Error fetching data:', error);
    //     });
    // }
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
   
    const productCategory = products.filter(product => product.category  == category)
  return (
    <div className='container mt-5 mb-5'>
        <div className='row'>
   

            {productCategory.map((product,index)=>(
                <div className='col-md-4'>
            <ProductCards key={index} product={product} addToCart={addToCart} />
            </div>
            ))

                
            }         
        
        </div>
        
    </div>
  )
}
