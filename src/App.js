import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./assests/style.css";
import Flash from "./pages/Flash";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Account from "./pages/Account";
import Verified from "./pages/Verified";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import ProductScreen from "./pages/ProductScreen";
import Cart from "./pages/Cart";
import { useState,useEffect } from "react";
import Checkout from "./pages/Checkout";
import OrderScreen from "./pages/OrderScreen";
import ProductDetails from "./pages/ProductDetails";

// import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [warning, setWarning] = useState(false);
  const addToCart = product => {
    const existingItem = cartItems.find(item => item._id === product._id);

    if (existingItem) {
      // If the item is already in the cart, update the quantity
      setWarning(true)
      setTimeout(()=>{
        setWarning(false)
      },2000)
      
      setCartItems(prevCart => prevCart.map(item => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCartItems(prevCart => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = productId => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    newQuantity = Math.max(newQuantity, 0);

    setCartItems(prevCart => prevCart.map(item => (item._id === productId ? { ...item, quantity: newQuantity } : item)));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity -
        item.price * item.quantity * item.discount,
      0
    );
  };

  useEffect(() => {
    // Save cart items to localStorage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  return (
    <BrowserRouter>
  
      <Header size={cartItems.length} />
      {warning && <div className="btn-secondary">Product already added</div>}
      <Routes>
        <Route exact path="/" element={<Home addToCart={addToCart} />} />
        <Route exact path="/flash" element={<Flash addToCart={addToCart} />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/verified" element={<Verified />} />
        <Route exact path="/forgot" element={<ForgotPass />} />
        <Route exact path="/reset" element={<ResetPass />} />
        <Route exact path="/order" element={<OrderScreen />} />
        <Route
          exact
          path="/products/:category"
          element={
            <ProductScreen  addToCart={addToCart}/>
          }
        />
                <Route
          exact
          path="/product/:detail"
          element={
            <ProductDetails />
          }
        />
      
        <Route
          exact
          path="/check"
          element={<Cart  cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} calculateTotalPrice={calculateTotalPrice}/>}
        />
     
         <Route exact path="/checkout"  element={<Checkout cartItems={cartItems} calculateTotalPrice={calculateTotalPrice}/>} />
      </Routes>
     

      <Footer />
    </BrowserRouter>

    // element={({params})=> (<ProductScreen categorychose={params.category}/>)}

    // render={({ match }) => (
    //   <ProductScreen categoryChoose={match.params.category}
  );
}

export default App;
