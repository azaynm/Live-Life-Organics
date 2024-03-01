import React from 'react'
import { useEffect } from "react";
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';


const API_BASE = "http://localhost:8080";


const MyAccount = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const key = localStorage.getItem('rfkey');
    const uid = localStorage.getItem('username');

    const [orders, setOrders] = useState([]);



    useEffect(() => {
        loadUserData();
    }, [email]);


    const logOut = async () => {
        const data = await fetch(API_BASE, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: uid,
            })
        }).then(() => {
            localStorage.removeItem("username");
            localStorage.removeItem("rfkey");
            navigate('/');
        });
    }

    const loadUserData = async () => {
        const data = await fetch(API_BASE + "/api/get-user-details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: uid,
            })
        }).then((res) => {
            return res.json();
        }).then(async (data) => {
            setEmail(data.email);
        });
    }

    const viewCart = () => {
        const username = localStorage.getItem('username');
        navigate(`/cart/${username}`);
    }

    const fetchPaymentDetails = async () => {
        if (isAdmin) {
            try {
                const { data: response } = await axios.get(`http://localhost:8080/api/payment/payments`);
                setOrders(response);
                console.log(response);

            } catch (error) {
                console.error(error.message);
            }
        }
    }

    useEffect(() => {
        fetchPaymentDetails();
    }, []);

    return (
        <div className='container'>
            <div className='row'>Howdy </div>
            {(isAdmin ?
                (<div>

                    {orders.map(item => (
                        <div class="card" >
                        <div class="card-body">
                         
                          <p class="card-text">Customer Name: {item.name}</p>
                       <p class="card-text">Billing Address: {item.billingAddress}</p>
                       <p class="card-text">Ordered Items</p>
                       {item.foodId.map((item2, i)=>(
                                                      <div>{i+1} {item2.foodName}</div>
                                                  ))}
                          <a href="#" class="btn btn-primary">Confirm Order</a>
                        </div>
                      </div>
                    ))}

                </div>) :
                (<div>User</div>))}
        </div>
    )
}

export default MyAccount