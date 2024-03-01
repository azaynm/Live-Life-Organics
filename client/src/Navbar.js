import React, { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const { Link } = require("react-router-dom");

const API_BASE = "http://localhost:8080";

const Navbar = ({cartCount, setCartCount, fetchCartCount, isAdmin, setStatus, status, logOut}) => {

    const navigate = useNavigate();

    useEffect(() => {
        fetchCartCount();
      }, [cartCount]);
    


    return (
        <nav style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/" style={{ padding: "10px" }}>
                Home
            </Link>
            <Link to="/my-account" style={{ padding: "10px" }}>
                Profile
            </Link>
            
            {(isAdmin) ? (
                <Link to="/add-food" style={{ padding: "10px" }}>
                Add Food
            </Link>
            ) : (null)}
            
            <Link to="/register" style={{ padding: "10px" }}>
                Register
            </Link>
            {(!status) ? (

                <Link to="/login" style={{ padding: "10px" }}>
                    Login
                </Link>
            ) : (
                <span>
                <Link to="/login" style={{ padding: "10px" }} onClick={logOut}>
                    Logout
                </Link>

                <Link to={`/cart/${localStorage.getItem('username')}`}>
                <Badge badgeContent={cartCount} color="primary">
                    <MailIcon color="action" />
                </Badge>
            </Link>
            </span>
                
            )}

        </nav>
    )
}

export default Navbar