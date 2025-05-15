import "./Verify.css";
import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import {useSearchParams} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx'
import { useNavigate } from 'react-router-dom';



const Verify = () => {

    const[searchParams, setSearchParams] = useSearchParams();
    const success=searchParams.get("success")
    const orderId=searchParams.get("orderId")
    const {url}= useContext(StoreContext);
    const navigate = useNavigate();
    const verifyPayment = async()=>{
        const response =await axios.post(url+"/api/order/verify",{success, orderId});
        if (response.data.success) {
            navigate("/myorders");
        }
        else{
            navigate("/");
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
  return (
    <div className="verify">
        <div className="spinner">
           

        </div>

    </div>
  )
}

export default Verify