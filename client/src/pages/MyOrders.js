import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MyOrders = () => {

    const API_BASE = "http://localhost:8080";
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReadyItems = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE}/api/order/completed-orders/${localStorage.getItem("username")}/pending`);
            setItems(response.data);
            console.log(response.data)
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReadyItems(); // Initial fetch
    }, []); // Fetch campaigns initially


    return (
        <div>MyOrders</div>
    )
}

export default MyOrders