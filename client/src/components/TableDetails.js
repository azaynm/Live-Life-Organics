import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReservationForm from "../components/ReservationForm";

function TableDetails() {
    const navigate = useNavigate(); 

    const handleBookNowClick = () => {
      navigate("/ReservationForm"); 
    };

      
  return (
    <div>
      <div class="card-group">
        <div class="card m-5">
          <img
            src="./indoor.jpg"
            class="card-img-top"
            alt=" "
            width="250px"
            height="350px"
          />
          <div class="card-body">
            <h5 class="card-title">Indoor Table</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <Link to="/ReservationForm">
            <button type="button" class="btn btn-success" onClick={handleBookNowClick}>
              BOOK NOW
            </button>
            </Link>
          </div>
        </div>
        <div class="card m-5">
          <img
            src="./outdoor.jpg"
            class="card-img-top"
            alt=" "
            width="250px"
            height="350px"
          />
          <div class="card-body">
            <h5 class="card-title">Outdoor Table</h5>
            <p class="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
            <button type="button" class="btn btn-success" onClick={handleBookNowClick}>
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableDetails;
