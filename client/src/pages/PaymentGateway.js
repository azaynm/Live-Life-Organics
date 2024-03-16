import React from 'react'
import axios from 'axios';
import Stripe from 'react-stripe-checkout';

const PaymentGateway = () => {

    const handleToken = async(totalAmount, token) => {
        const response = await axios.post("http://localhost:8080/api/stripe/pay", {
            token: token.id,
            amount: totalAmount
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
        handleToken(100, token);
    }
    return (
        <div>
            <Stripe
                stripeKey="pk_test_51OuRCSJ53U8MN5Mj2obY1BkeJ1cl0bDIc5PnHEAOWQZUaipW0AUb95gC5z0wV8ohGaV4nS9rk3t0q0nM9A4z9tjP00MZmzpukX"
                token={tokenHandler}
            />
        </div>
    )
}

export default PaymentGateway