import React from 'react';
import "./MyOrders.css";
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {assets} from '../../assets/assets.js';

const MyOrders = () => {
 const {url, token, user} = useContext(StoreContext);
 const [data, setData] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
  
 const fetchOrders = async () => {
   if (!user || !user._id) {
     console.error("Cannot fetch orders: User ID not available");
     setLoading(false);
     setError("User information not available. Please log in again.");
     return;
   }

   try {
     console.log("Fetching orders for user:", user._id);
     const response = await axios.post(
       `${url}/api/order/userorders`,
       { userId: user._id },
       { headers: { token } }
     );
     console.log("Orders response:", response.data);
     setData(response.data.data);
     setLoading(false);
   } catch (error) {
     console.error("Error fetching orders:", error);
     setError("Failed to load orders. Please try again.");
     setLoading(false);
   }
 };

 useEffect(() => {
   if(token && user) {
     fetchOrders();
   }
 }, [token, user]);

 if (loading) {
   return <div className="my-orders"><p>Loading your orders...</p></div>;
 }

 if (error) {
   return <div className="my-orders"><p className="error-message">{error}</p></div>;
 }

 return (
   <div className='my-orders'>
     <h2>My Orders</h2>
     <div className='container'>
       {data && data.length > 0 ? (
         data.map((order, index) => (
           <div key={index} className='my-orders-order'>
             <img src={assets.parcel_icon} alt="" />
             <p>{order.items.map((item, index)=>{
               if(index===order.items.length-1){
                 return item.name+" x " +item.quantity;
               } else {
                 return item.name+" x " +item.quantity+", ";
               }
             })}</p>
             <p>₹{order.amount}</p>
             <p>Items: {order.items.length}</p>
             <p><span>&#x25cf;</span> <b>{order.status}</b></p>
             <p>Payment: <b>{order.payment ? "Completed" : "Pending"}</b></p>
             <button onClick={fetchOrders}>Track Order</button>
           </div>
         ))
       ) : (
         <p className="no-orders-message">You don't have any orders yet</p>
       )}
     </div>
   </div>
 );
};

export default MyOrders;