
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
import AddFood from './pages/AddMenuItem';
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
import AddGiftCard from './pages/AddGiftCard';



import Admin from './pages/Admin';
import RegisterEmployee from './pages/RegisterEmployee';
import LoginEmployee from './pages/LoginEmployee';
import DeliveryApproval from "./pages/DeliveryApproval";
import PendingReservations from "./pages/PendingReservations";
import MyOrders from "./pages/MyOrders";
import ReservationForm from './components/ReservationForm';
import Map from './pages/Map';
import Feedback from './pages/Feedback';
import FeedbackMonitor from './pages/FeedbackMonitor';
import UserDashboard from './pages/UserDashboard';
import GiftCard from './pages/GiftCard';
import EditInventoryItem from './pages/EditInventorItem';
import AddInventoryItem from './pages/AddInventoryItem';
import InventoryDashboard from './pages/InventoryDashboard';
import EditMenuItem from './pages/EditMenuItem';




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


            <Route path='/delivery-approval'
              element={
                // <RoleProtected role={role} specificRole="systemAdmin">
                <DeliveryApproval />
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

            <Route path='/add-menu'
              element={
                <AddFood categories={categories} />
              }
            />


            <Route path='/edit-menu-item/:itemId' element={<EditMenuItem categories={categories}/>} />

            {/* <Route path='/employee'
              element={
                // <RoleProtected role={role} specificRole = "systemAdmin">
                <Employee />
                // </RoleProtected>
              }
            /> */}

            <Route path='/my-account'
              element={
                <Protected isLoggedIn={status}>
                  <MyAccount role={role} />
                </Protected>
              }
            />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setStatus={setStatus} />} />

            <Route path='/add-gift-card' element={<AddGiftCard />} />

            <Route path="/pending-reservations" element={<PendingReservations />} />
            <Route path="/ReservationForm" element={<ReservationForm />} />

            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/map" element={<Map />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />

            <Route path="/feedback" element={<Feedback />} />
            <Route path="/gift-card" element={<GiftCard />} />
            <Route path='/edit-inventor-item/:id' element={<EditInventoryItem />} />
            <Route path='/add-inventory-item' element={<AddInventoryItem />} />
            <Route path='/inventory-dashboard' element={<InventoryDashboard />} />
          </Routes>
        </div>

      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
