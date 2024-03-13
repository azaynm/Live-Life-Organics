
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
      refreshToken: token,
    };


    const { data: response } = await axios.post('http://localhost:8080/api/refreshToken', user)
    console.log(response.error);
    if (response.error === false) {
      setStatus(true);
      console.log("setted true");
    }
    else {
      setStatus(false);
      console.log("setted false");
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);



  const fetchRole = async () => {
    try {
      const { data: response } = await axios.get(`http://localhost:8080/api/users/getId/${localStorage.getItem("username")}`);
      
      setRole(response.user.roles);
      console.log("Your role is "+ response.user.roles);
      console.log(response);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchRole();
  }, []);



  const fetchCartCount = async () => {
    try {
      const { data: response } = await axios.get(`http://localhost:8080/api/cart/users/${localStorage.getItem('username')}`);
      setCartCount(response);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchCartCount();
  }, [cartFoodData]);


  

  const fetchCartFoodData = async () => {
    setCartFoodLoading(true);
    try {
      const { data: response } = await axios.get(`http://localhost:8080/api/cart/user/${localStorage.getItem('username')}`);
      setCartFoodData(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
    setCartFoodLoading(false);
  }

  useEffect(() => {
    fetchCartFoodData();
  }, []);

  useEffect(() => {
    fetchCartFoodData();
  }, [setCartFoodData]);

  useEffect(() => {
    fetchCartFoodData();
  }, [setCartFoodData]);

  const deleteItem = async (id) => {

    await Swal.fire({
      title: 'Do you want to remove this from?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Removed Item!', '', 'success')
        const data = fetch(`http://localhost:8080/api/cart/delete/${id}`, { method: "DELETE" })
          .then(res => res.json());
        setCartFoodData(cartFoodData => cartFoodData.filter(cartFoodItem => cartFoodItem._id !== data._id))


      } else if (result.isDenied) {
        Swal.fire('Item is not removed', '', 'info')
      }
    })
    getCartTotal();
    fetchCartFoodData();
  }

  const getCartTotal = async () => {
    try {
      const { data: response } = await axios.get(`http://localhost:8080/api/cart/user/getTotal/${localStorage.getItem("username")}`);
      setCartTotal(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }

  }

  useEffect(() => {
    getCartTotal();
  }, []);


  const calculateTotal = ({ target }) => {
    setQuantity(target.value);
    setTotal(target.value * data.price);
  }

  const addToCart = async () => {

    Swal.fire({
      title: 'Are you sure want to add this to the cart?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Added!',
          'success'
        )
        const cartItem = {
          userId: localStorage.getItem('username'),
          foodId: data._id,
          foodName: data.name,
          foodImage: data.image,
          quantity: quantity,
          total: total
        };

        const headers = {
          'Authorization': 'Bearer my-token',
          'My-Custom-Header': 'foobar'
        };
        axios.post(API_BASE + '/api/cart/add-item', cartItem, { headers });
        setCartFoodData(...cartFoodData, cartItem);
        fetchCartFoodData();
        getCartTotal();
      }
    });

  }

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
          <Navbar cartCount={cartCount} setCartCount={setCartCount} fetchCartCount={fetchCartCount} role={role} setStatus={setStatus} status={status} logOut={logOut} />
          <Routes>

            <Route path='/' element={<Home categories={categories} />} />

            <Route path='/:id' element={<SingleFood fetchCartFoodData={fetchCartFoodData} fetchCartCount={fetchCartCount} addToCart={addToCart} setLoading={setLoading} setData={setData} total={total} calculateTotal={calculateTotal} data={data} />} />
            <Route path='/update/:id' element={<UpdateFood />} />
            <Route path='/payment' element={<Payment cartTotal={cartTotal} cartFoodData={cartFoodData} />} />


            <Route path='/cart/:id'
              element={
                <Protected isLoggedIn={status}>
                  <Cart deleteItem={deleteItem} fetchCartFoodData={fetchCartFoodData} cartFoodLoading={cartFoodLoading} cartFoodData={cartFoodData} addToCart={addToCart} getCartTotal={getCartTotal} cartTotal={cartTotal} orderData={orderData} setOrderData={setOrderData} />
                </Protected>
              }

            />

<Route path='/delivery-management'
              element={
                <RoleProtected role={role}>
                  <DeliveryManagement />
                </RoleProtected>
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
                <RoleProtected role={role}>
                  <AddFood categories={categories}/>
                </RoleProtected>
              }
            />

            <Route path='/my-account'
              element={
                <Protected isLoggedIn={status}>
                  <MyAccount role={role}/>
                </Protected>
              }
            />

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

          </Routes>
        </div>

      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
