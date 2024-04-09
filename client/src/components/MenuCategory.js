import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './MenuCategory.css';
import FormData from 'form-data';
import './MenuCategory.css';

const MenuCategory = ({ category }) => {

    const API_BASE = "http://localhost:8080";
    const [categoryMenuItems, setCategoryMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const fetchCategoryMenuItems = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${API_BASE}/api/${category}`);
            const items = response.data.map(item => ({ ...item, quantity: 1 })); // Add quantity property to each item
            setCategoryMenuItems(items);
        } catch (error) {
            console.log("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryMenuItems(); // Initial fetch
    }, []); // Fetch campaigns initially


    const addItemToCart = (foodId, quantity) => {

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
                    id: localStorage.getItem('username'),
                    food: foodId,
                    quantity: quantity
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


    const handleIncreaseQuantity = (index) => {
        console.log('Increasing quantity for item at index:', index);
        setCategoryMenuItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems[index].quantity += 1;
            console.log('Updated items:', updatedItems);
            return updatedItems;
        });
    };

    const handleDecreaseQuantity = (index) => {
        console.log('Decreasing quantity for item at index:', index);
        setCategoryMenuItems(prevItems => {
            const updatedItems = [...prevItems];
            if (updatedItems[index].quantity > 1) {
                updatedItems[index].quantity -= 1;
            }
            console.log('Updated items:', updatedItems);
            return updatedItems;
        });
    };

    const filteredMenuItems = categoryMenuItems.filter((menuItem) =>
    menuItem.name.toLowerCase().includes(searchInput.toLowerCase())
);

    return (
        <div className="scrollable-container">
            <input
                    type="text"
                    className="form-control my-5"
                    placeholder="Search by name"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            <div className="row row-cols-1 row-cols-md-3 g-4">
                
                {filteredMenuItems.map((menuItem, index) => (
                    <div key={index} className="col">
                        <div className="card h-100">
                            <img src={menuItem.image} className="card-img-top" alt="..." style={{ width: '100px', height: '100px' }} />
                            <div className="card-body">
                                <h5 className="card-title">{menuItem.name}</h5>
                                <p className="card-text">Rs. {menuItem.sellingPrice}</p>
                                <div className='d-flex justify-content-center align-items-center'>
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleDecreaseQuantity(index)}>-</button>
                                    <input type="text" className="form-control mx-2" value={menuItem.quantity} readOnly />
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleIncreaseQuantity(index)}>+</button>
                                </div>
                                <button className='btn btn-danger mt-2' onClick={() => addItemToCart(menuItem._id, menuItem.quantity)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenuCategory