import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Link } = require("react-router-dom");

const API_BASE = "http://localhost:8080";

const Navbar = ({ role, setStatus, status, logOut }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-dark" style={{ textAlign: "center", marginTop: "0px" }}>
      <Link
        to={`/cart/${localStorage.getItem("username")}`}
        style={{
          color: "white",
          fontWeight: "bold",
          textDecoration: "none",
          padding: "10px",
        }}
      >
        Cart
      </Link>
      <Link
        to="/"
        style={{
          color: "white",
          fontWeight: "bold",
          textDecoration: "none",
          padding: "10px",
        }}
      >
        Home
      </Link>
      <Link
        to="/my-account"
        style={{
          color: "white",
          fontWeight: "bold",
          textDecoration: "none",
          padding: "10px",
        }}
      >
        Profile
      </Link>

      {role.includes("systemAdmin") ? (
        <Link
          to="/add-food"
          style={{
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            padding: "10px",
          }}
        >
          Add Food
        </Link>
      ) : null}

      {role.includes("eventCoordinator") ? (
        <Link
          to="/event-management"
          style={{
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            padding: "10px",
          }}
        >
          Event Management
        </Link>
      ) : null}

      {role.includes("deliveryStaff") ? (
        <Link
          to="/delivery-management"
          style={{
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            padding: "10px",
          }}
        >
          Delivery Management
        </Link>
      ) : null}

      <Link
        to="/register"
        style={{
          color: "white",
          fontWeight: "bold",
          textDecoration: "none",
          padding: "10px",
        }}
      >
        Register
      </Link>
      {!status ? (
        <Link
          to="/login"
          style={{
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            padding: "10px",
          }}
        >
          Login
        </Link>
      ) : (
        <span>
          <Link
            to="/login"
            style={{
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
              padding: "10px",
            }}
            onClick={logOut}
          >
            Logout
          </Link>

          {/* <Link to={`/cart/${localStorage.getItem('username')}`}>
                        <Badge badgeContent={cartCount} color="primary">
                            <MailIcon color="action" />
                        </Badge>
                    </Link> */}
        </span>
      )}

      <Link
        to="/Reservation"
        style={{
          color: "white",
          fontWeight: "bold",
          textDecoration: "none",
          padding: "10px",
        }}
      >
        Reservation
      </Link>

      {role.includes("systemAdmin") ? (
        <Link
          to="/admin"
          style={{
            color: "white",
            fontWeight: "bold",
            textDecoration: "none",
            padding: "10px",
          }}
        >
          Admin Dashboard
        </Link>
      ) : null}
    </nav>
  );
};

export default Navbar;
