import React from 'react'
import SideMenu from '../components/SideMenu'
import FlashShales from '../components/FlashShales'
import Category from '../components/Category'

function Home({addToCart}) {
  return (<>
    <SideMenu/>
    <FlashShales addToCart={addToCart}/>
    <Category />
    </>
    
    
  )
}

export default Home