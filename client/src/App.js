
import 'bootstrap/dist/css/bootstrap.min.css';



import { Routes, Route, BrowserRouter, useNavigate, Navigate } from "react-router-dom";

import Navbar from './Navbar';
import Home from './pages/Home';
import MyAccount from './pages/MyAccount';
import Register from './pages/Register';
import Login from './pages/Login';
import Protected from './Protected';
import { Context } from './Context';
import React, { useEffect, useState } from 'react';
import AddFood from './pages/AddFood';
import SingleFood from './pages/SingleFood';
import Cart from './pages/Cart';
import Swal from 'sweetalert2'
import UpdateFood from './pages/UpdateFood';
import axios from 'axios';
import RoleProtected from './RoleProtected';
import Payment from './pages/Payment';
import { fabClasses } from '@mui/material';
import EventManagement from './pages/EventManagement';
import DeliveryManagement from './pages/DeliveryManagement';
import Reservation from './pages/Reservation';
import Test from './pages/Test';
import PaymentGateway from './pages/PaymentGateway';
import OrderApproval from './pages/OrderApproval';
import { Employee } from './pages/Employee';
import AddGiftCard from './pages/AddGiftCard';



import Admin from './pages/Admin';
import RegisterEmployee from './pages/RegisterEmployee';
import LoginEmployee from './pages/LoginEmployee';
import OrderApproval from "./pages/OrderApproval";
import PendingReservations from "./pages/PendingReservations";




const API_BASE = "http://localhost:8080";



function App() {
  const [categories, setCategories] = useState(["Entrees", "Appetizers", "SideDishes", "Salads", "Soups", "Desserts", "Beverages", "Specials"]);

  const baseURL = `http://localhost:8080/api/cart/user/${localStorage.getItem('username')}`;
  const key = localStorage.getItem("rfkey");
  const [homeFoodData, setHomeFoodData] = useState([])
  const [cartFoodData, setCartFoodData] = useState([])
  const [cartFoodLoading, setCartFoodLoading] = useState(true);
  const [homeFoodLoading, setHomeFoodLoading] = useState(true);
  const [cartCount, setCartCount] = useState("");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const [total, setTotal] = useState("")
  const [quantity, setQuantity] = useState("")

  const [role, setRole] = useState(["user"]);

  const [cartTotal, setCartTotal] = useState("");
  const [orderData, setOrderData] = useState([]);


  const [status, setStatus] = useState(false);
  const token = localStorage.getItem('rfkey');



  const checkLogin = async () => {
    const user = {
      refreshToken: localStorage.getItem('rfkey'),
    };


    const { data: response } = await axios.post('http://localhost:8080/api/refreshToken', user)
    console.log(response.error);
    if (response.error === false) {
      setStatus(true);
      console.log("logged in setted true");
    }
    else {
      setStatus(false);
      console.log("logged in setted false");
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);



  const fetchRole = async () => {
    try {
      const { data: response } = await axios.get(`http://localhost:8080/api/users/getId/${localStorage.getItem("username")}`);

      setRole(response.user.roles);
      console.log("Your role is " + response.user.roles);
      console.log(response);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchRole();
  }, []);












  const logOut = async () => {


    await fetch(API_BASE + "/api/refreshToken", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("rfkey"),
      })
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem("rfkey", "");
        localStorage.setItem("username", "");
        console.log("logged out successfully");
        window.location.reload(false);
        setStatus(false);
        console.log(status);
      }
      else {
        console.log("Cannot logout");

      }

    })
    localStorage.removeItem("isLogged");
  };




  return (
    <Context.Provider>
      <BrowserRouter>
        <div>
          <Navbar role={role} setStatus={setStatus} status={status} logOut={logOut} />
          <Routes>

            <Route path='/' element={<Home categories={categories} />} />



            <Route path='/reservation' element={

              <Reservation />
            } />


            <Route path='/my-account'
              element={
                <Protected isLoggedIn={status}>
                  <MyAccount role={role} />
                </Protected>
              }
            />

            <Route path='/payment'
              element={

                <PaymentGateway />
              }
            />

            <Route path='/cart/:id'
              element={
                <Protected isLoggedIn={status}>
                  <Cart />
                </Protected>
              }

            />

            <Route path='/delivery-management'
              element={
                // <RoleProtected role={role} specificRole="systemAdmin">
                <DeliveryManagement />
                // </RoleProtected>
              }
            />


            <Route path='/order-approval'
              element={
                // <RoleProtected role={role} specificRole="systemAdmin">
                <OrderApproval />
                // </RoleProtected>
              }
            />

            <Route path='/event-management'
              element={
                <RoleProtected role={role}>
                  <EventManagement />
                </RoleProtected>
              }
            />

            <Route path='/add-food'
              element={
                <RoleProtected role={role} specificRole="systemAdmin">
                  <AddFood categories={categories} />
                </RoleProtected>
              }
            />

            <Route path='/employee'
              element={
                // <RoleProtected role={role} specificRole = "systemAdmin">
                <Employee />
                // </RoleProtected>
              }
            />

            <Route path='/my-account'
              element={
                <Protected isLoggedIn={status}>
                  <MyAccount role={role} />
                </Protected>
              }
            />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/add-gift-card' element={<AddGiftCard />} />

            <Route path="/pending-reservations" element={<PendingReservations />} />

          </Routes>
        </div>

      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
