import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom' 
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/Place Order/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopUp/LoginPopup'
import { useState } from 'react'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => { 

  const[showLogin, setShowLogin] = useState(false)

  
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>} />
        
      </Routes>
    </div>
    <Footer/>
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    </>
  
  )
}

export default App
