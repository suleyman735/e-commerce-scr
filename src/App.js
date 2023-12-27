
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import './assests/style.css';
function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route exact path='/' element={<Home/>} />
    </Routes>
    <Footer />
    </BrowserRouter>


     

  );
}

export default App;
