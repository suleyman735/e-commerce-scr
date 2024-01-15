
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import './assests/style.css';
import Flash from "./pages/Flash";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
// import { QueryClient, QueryClientProvider } from 'react-query';



function App() {
  const { isAuthenticated, login } = useAuth();

  return (
    
   
    
    <BrowserRouter>
    <Header />
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/flash' element={<Flash/>} />
      <Route exact path='/signup' element={<Signup/>} />
      <Route exact path='/login' element={<Login/>} />
      
    </Routes>
    <Footer />
    </BrowserRouter>



     

  );
}

export default App;
