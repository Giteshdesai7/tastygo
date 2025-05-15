import { createContext } from "react";  
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
export const StoreContext = createContext(null);
 const  StoreContextProvider = (props) => {

    const[cartItems, setCartItems] = useState({});
    const[user, setUser] = useState(null);

    // Use environment variable for API URL or fallback to localhost for development
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
    const [token,setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const getUserInfo = async (token) => {
      try {
        const response = await axios.post(url+"/api/user/info", {}, {headers: {token}});
        if (response.data.success) {
          setUser(response.data.user);
          console.log("User info loaded:", response.data.user);
        }
      } catch (error) {
        console.error("Error loading user info:", error);
      }
    };

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=> ({...prev, [itemId]: 1}))
            toast.success("Added to cart");
    }
    else{
        setCartItems((prev)=> ({...prev, [itemId]: prev[itemId] + 1 }))
        toast.success("Added to cart");
    }
    if(token){
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
    }

    const removeFromCart = async(itemId) => {
        setCartItems((prev)=> ({...prev, [itemId]: prev[itemId]-1}));
        toast.error('Removed from cart');
        
        if(token){
            await axios.post(url+"/api/cart/remove", {itemId},{headers:{token}})

        }
    }
   const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id ===item)
            totalAmount += itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;
   }

   const fetchFoodList = async ()=> {
    const response = await axios.get(url+"/api/food/list");
    setFoodList(response.data.data)
   }

   const loadCartData = async(token) =>{
    const response = await axios.post(url+"/api/cart/get", {},{headers:{token}});
    setCartItems(response.data.cartData);
   }

   useEffect(()=> {
       
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
                await getUserInfo(localStorage.getItem("token"));
            }
        }
        loadData();
   },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        user,
        setUser
    }


    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}   
        </StoreContext.Provider>
    )
 }

 export default StoreContextProvider;