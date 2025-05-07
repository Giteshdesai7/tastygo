import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
const Header = () => {
   const navigate = useNavigate();
  return (
    <div className="header" >
        <div className="header-contents">
            <h2>Order your favourite food Here</h2>
            <p>
                Choose from a diverse menu a delectable array of dishes crafted with the finest ingredients and culinary expertise, one delicious meal at a time. try our latest dishes and enjoy the taste of the finest ingredients. let us know what you think. And We really Hope you enjoy our food.
            </p>
           
            <button  onClick={() => {const menuSection = document.getElementById("explore-menu");
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: "smooth" });
  }
}}>View Menu</button>
            
        </div>

    </div>
  )
}

export default Header