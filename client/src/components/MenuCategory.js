import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './MenuCategory.css';
import FormData from 'form-data';

const MenuCategory = ({ category }) => {

    const API_BASE = "http://localhost:8080";
    const [categoryMenuItems, setCategoryMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCategoryMenuItems = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE}/api/${category}`);
            const items = response.data;
            setCategoryMenuItems(items);
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoading(false); // Set isLoading to false regardless of success or error
        }
    };

    useEffect(() => {
        fetchCategoryMenuItems(); // Initial fetch
    }, []); // Fetch campaigns initially


    const addItemToCart = ({foodId}) => {
        Swal.fire({
            title: "Add this to Cart?",
            text: "You can remove this from the Cart!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Add it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    userId: "65e175ebe1a44422c1be63d7",
                    foodId: "65f0287a7bc6e04cc4ed5057",
                    quantity: 5,
                    total: 60
                };
    
                try {
                    axios.post(`${API_BASE}/api/cart/add-item`, data);
                    console.log("Data uploaded successfully:", data);
                    Swal.fire({
                        title: "Added!",
                        text: "Item Added.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("Error uploading data:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to add item to cart.",
                        icon: "error"
                    });
                }
            }
        });
    };
    

    return (
        <div className="scrollable-container">
            <div className="grid-container">
                {categoryMenuItems.map((menuItem, index) => (
                    <div>
                        <button key={index}>
                            <div className="grid-item">
                                <img src={menuItem.image} alt="..." style={{ width: '100px', height: '100px' }} />
                                <div>{menuItem.name}</div>
                                <h4>Rs. {menuItem.sellingPrice}</h4>
                            </div>
                        </button>

                        <button className='btn btn-danger' onClick={() => addItemToCart(menuItem._id)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MenuCategory