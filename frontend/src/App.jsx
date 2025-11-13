import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Cart from './pages/Cart/cart';
import Placeorder from './pages/Placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import Loginpopup from './components/Login/Loginpopup';
import Verify from './pages/verify/Verify';
import MyOrder from './pages/myOrder/myOrder'; // ✅ Corrected import

const App = () => {
  const [ShowLogin, setShowLogin] = useState(false);

  return (
    <>
      {ShowLogin && <Loginpopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrder />} /> {/* ✅ Correct usage */}
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
