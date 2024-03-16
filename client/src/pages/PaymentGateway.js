import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Stripe from 'react-stripe-checkout';
import { Button, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';

const PaymentGateway = () => {
    const API_BASE = "http://localhost:8080";
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState(0);
    
    const [invalidCoupon, setInvalidCoupon] = useState(false);

    const location = useLocation();
    const { total } = location.state;

    const [totalAfterCoupon, setTotalAfterCoupon] = useState(total);
    const handleCouponCodeChange = (event) => {
        setCouponCode(event.target.value);
    };

    const handleApplyCoupon = async () => {
        const username = localStorage.getItem('username');
        try {
            const response = await axios.get(`${API_BASE}/api/gift-card/check-gift-card`, {
                params: { customer: username, code: couponCode } // Use params to send query parameters
            });

            const giftCards = response.data;

            if (giftCards && giftCards.length > 0) {
                // Assuming couponDiscountValue is a field in the first gift card returned
                const couponDiscountValue = giftCards[0].amount;
                console.log(couponDiscountValue);

                // Update coupon discount state
                setCouponDiscount(couponDiscountValue);

                // Calculate total after applying coupon
                const totalWithDiscount = total - couponDiscountValue;
                setTotalAfterCoupon(totalWithDiscount);
                setInvalidCoupon(false);
            } else {
                console.error('No gift cards found for the provided customer and code.');
                setInvalidCoupon(true);
            }
        } catch (error) {
            console.error('Error while fetching coupon discount:', error);
            // Handle error, e.g., display an error message to the user
            setInvalidCoupon(true);
        }
    };

    const handleToken = async (totalAmount, token) => {
        const response = await axios.post("http://localhost:8080/api/stripe/pay", {
            token: token.id,
            amount: totalAmount,
        })
        console.log(response);
        if (response.status === 200) {
            // Assuming 'addToDatabase' is a function to add data to the database
            console.log(response.data);
            const charge = response.data;

            // Chain the second POST request inside the first one
            return axios.post("http://localhost:8080/api/payment/add-payment", {
                email: charge.billing_details.name,
                reference: charge.id,
                amount: charge.amount,
                customer: charge.customer,
                userName: localStorage.getItem("username")
            });
        } else {
            console.log("Stripe payment request failed");
            // Return a rejected promise to skip the execution of the next .then() block
            return Promise.reject("Stripe payment request failed");
        }

    }


    const tokenHandler = (token) => {
        handleToken(totalAfterCoupon, token);
    }
    return (
        <div className="container">
    <h1>Payment</h1>
    <div className="row mb-3">
        <div className="col-6">
            <TextField
                label="Enter Coupon Code"
                variant="outlined"
                value={couponCode}
                onChange={handleCouponCodeChange}
                className="form-control"
            />
        </div>
        <div className="col-3">
            <Button
                variant="contained"
                color="primary"
                onClick={handleApplyCoupon}
                className="btn btn-primary"
            >
                Apply Coupon
            </Button>
        </div>
    </div>
    <div>
        {/* Display message for invalid coupon */}
        {invalidCoupon && <div style={{ color: 'red' }}>Invalid Coupon</div>}
        <div>Total: Rs. {total}</div>
        {couponDiscount > 0 && <div>Coupon Discount: Rs. {couponDiscount}</div>}
        {couponDiscount > 0 && <div>Total After Coupon: Rs. {totalAfterCoupon}</div>}
    </div>
            <Stripe
                stripeKey="pk_test_51OuRCSJ53U8MN5Mj2obY1BkeJ1cl0bDIc5PnHEAOWQZUaipW0AUb95gC5z0wV8ohGaV4nS9rk3t0q0nM9A4z9tjP00MZmzpukX"
                token={tokenHandler}
            />
        </div>
    )
}

export default PaymentGateway