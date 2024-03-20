import "bootstrap/dist/css/bootstrap.min.css";

import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./Protected";
import { Context } from "./Context";
import React, { useEffect, useState } from "react";
import AddFood from "./pages/AddFood";
import SingleFood from "./pages/SingleFood";
import Cart from "./pages/Cart";
import Swal from "sweetalert2";
import UpdateFood from "./pages/UpdateFood";
import axios from "axios";
import RoleProtected from "./RoleProtected";
import Payment from "./pages/Payment";
import { fabClasses } from "@mui/material";
import EventManagement from "./pages/EventManagement";
import DeliveryManagement from "./pages/DeliveryManagement";
import Reservation from "./pages/Reservation";
import ReservationForm from "./components/ReservationForm";

import Test from "./pages/Test";
import PaymentGateway from "./pages/PaymentGateway";


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
import Admin from './pages/Admin';
import RegisterEmployee from './pages/RegisterEmployee';
import LoginEmployee from './pages/LoginEmployee';




const API_BASE = "http://localhost:8080";

function App() {
  const [categories, setCategories] = useState([
    "Entrees",
    "Appetizers",
    "SideDishes",
    "Salads",
    "Soups",
    "Desserts",
    "Beverages",
    "Specials",
  ]);

  const baseURL = `http://localhost:8080/api/cart/user/${localStorage.getItem(
    "username"
  )}`;
  const key = localStorage.getItem("rfkey");
  const [homeFoodData, setHomeFoodData] = useState([]);
  const [cartFoodData, setCartFoodData] = useState([]);
  const [cartFoodLoading, setCartFoodLoading] = useState(true);
  const [homeFoodLoading, setHomeFoodLoading] = useState(true);
  const [cartCount, setCartCount] = useState("");

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [total, setTotal] = useState("");
  const [quantity, setQuantity] = useState("");

  const [role, setRole] = useState(["user"]);

  const [cartTotal, setCartTotal] = useState("");
  const [orderData, setOrderData] = useState([]);

  const [status, setStatus] = useState(false);
  const token = localStorage.getItem("rfkey");

  const checkLogin = async () => {
    const user = {
      refreshToken: localStorage.getItem("rfkey"),
    };

    const { data: response } = await axios.post(
      "http://localhost:8080/api/refreshToken",
      user
    );
    console.log(response.error);
    if (response.error === false) {
      setStatus(true);
      console.log("logged in setted true");
    } else {
      setStatus(false);
      console.log("logged in setted false");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const fetchRole = async () => {
    try {
<<<<<<< Updated upstream
      const { data: response } = await axios.get(
        `http://localhost:8080/api/users/getId/${localStorage.getItem(
          "username"
        )}`
      );
=======
      const { data: response } = await axios.get(`http://localhost:8080/api/users/getId/${localStorage.getItem("username")}`);

      setRole(response.user.roles);
      console.log("Your role is " + response.user.roles);
      console.log(response);
>>>>>>> Stashed changes

      setRole(response.user.roles);
      console.log("Your role is " + response.user.roles);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const logOut = async () => {
    await fetch(API_BASE + "/api/refreshToken", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("rfkey"),
      }),
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem("rfkey", "");
        localStorage.setItem("username", "");
        console.log("logged out successfully");
        window.location.reload(false);
        setStatus(false);
        console.log(status);
      } else {
        console.log("Cannot logout");
      }
    });
    localStorage.removeItem("isLogged");
  };

  return (
    <Context.Provider>
      <BrowserRouter>
        <div>
          <Navbar
            role={role}
            setStatus={setStatus}
            status={status}
            logOut={logOut}
          />
          <Routes>
            <Route path="/" element={<Home categories={categories} />} />

           

<<<<<<< Updated upstream
            <Route
              path="/my-account"
=======

            <Route path='/admin' element={
              <Admin />
            } />
            <Route path='/reservation' element={

              <Reservation />
            } />


<Route path='/employee-login' element={<LoginEmployee />} />


            <Route path='/my-account'
>>>>>>> Stashed changes
              element={
                <Protected isLoggedIn={status}>
                  <MyAccount role={role} />
                </Protected>
              }
            />

<<<<<<< Updated upstream
            <Route path="/payment" element={<PaymentGateway />} />
=======
            <Route path='/payment'
              element={

                <PaymentGateway />
              }
            />
>>>>>>> Stashed changes

            <Route
              path="/cart/:id"
              element={
                <Protected isLoggedIn={status}>
                  <Cart />
                </Protected>
              }
            />

<<<<<<< Updated upstream
            <Route
              path="/delivery-management"
=======
            <Route path='/delivery-management'
>>>>>>> Stashed changes
              element={
                // <RoleProtected role={role} specificRole="systemAdmin">
                <DeliveryManagement />
                // </RoleProtected>
              }
            />

            <Route
              path="/event-management"


            <Route path='/order-approval'
              element={
                // <RoleProtected role={role} specificRole="systemAdmin">
                <OrderApproval />
                // </RoleProtected>
              }
            />

<<<<<<< Updated upstream
=======
            <Route path='/event-management'
>>>>>>> Stashed changes
              element={
                <RoleProtected role={role}>
                  <EventManagement />
                </RoleProtected>
              }
            />

            <Route
              path="/add-food"
              element={
                <RoleProtected role={role}>
                  <AddFood categories={categories} />
                </RoleProtected>
              }
            />

            <Route
              path="/my-account"
              element={
                <Protected isLoggedIn={status}>
                  <MyAccount role={role} />
                </Protected>
              }
            />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Reservation" element={<Reservation />} />
            <Route path="/ReservationForm" element={<ReservationForm />}/>
           
          </Routes>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
