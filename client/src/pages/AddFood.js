import axios from 'axios';
import React from 'react'
import FormData from 'form-data';

import { useState, } from "react";

const API_BASE = "http://localhost:8080";

const AddFood = ({categories}) => {

    

    const [file, setFile] = useState(null);
    const [newFood, setNewFood] = useState(
        {
            name: '',
            description: '',
            quantity: '',
            category: '',
            supplier: '',
            cost: '',
            sellingPrice: '',
            image: '',

        }
    );

    const handleChange = ({ target }) => {
        setNewFood({ ...newFood, [target.name]: target.value });
    }

    const handlePhoto = ({ target }) => {
        setFile(URL.createObjectURL(target.files[0]));
        setNewFood({ ...newFood, image: target.files[0] });
        console.log(newFood.image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('name', newFood.name);
        formData.append('description', newFood.description);
        formData.append('quantity', newFood.quantity);
        formData.append('category', newFood.category);
        formData.append('supplier', newFood.supplier);
        formData.append('cost', newFood.cost);
        formData.append('sellingPrice', newFood.sellingPrice);
        formData.append('image', newFood.image);


        console.log(formData.image);

        await axios.post('http://localhost:8080/api/upload', formData)
            .then(res => {
                console.log(formData);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <section class="vh-100">


            <div class="container-fluid h-custom h-100">
                <div class="row d-flex justify-content-center align-items-center h-100s h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5 d-flex">
                        <div class="mb-4 d-flex justify-content-center">
                            <img
                                src={file}
                                style={{ width: '300px', height: '300px' }} />
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                            <form onSubmit={handleSubmit} encType="multipart/form-data">

                                <div class="form-outline mb-4">
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handlePhoto}
                                    />

                                </div>




                                <div class="form-outline mb-4">
                                    <input
                                        className="form-control"
                                        placeholder="Enter Food Name"
                                        name="name"
                                        value={newFood.name}
                                        onChange={handleChange}
                                    />
                                    <label class="form-label" for="form3Example3">Enter food name</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input
                                        className="form-control"
                                        placeholder="Enter Food Description"
                                        name="description"
                                        value={newFood.description}
                                        onChange={handleChange}
                                    />
                                    <label class="form-label" for="form3Example3">Enter description</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input
                                        className="form-control"
                                        placeholder="Enter Food Quantity"
                                        name="quantity"
                                        value={newFood.quantity}
                                        onChange={handleChange}
                                    />
                                    <label class="form-label" for="form3Example3">Enter food quantity</label>
                                </div>

                                <div class="form-outline mb-4">
                                   
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={newFood.category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Food category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <label class="form-label" for="form3Example3">Enter food category</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input
                                        className="form-control"
                                        placeholder="Enter Food supplier"
                                        name="supplier"
                                        value={newFood.supplier}
                                        onChange={handleChange}
                                    />
                                    <label class="form-label" for="form3Example3">Enter food supplier</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input
                                        className="form-control"
                                        placeholder="Enter Food cost"
                                        name="cost"
                                        value={newFood.cost}
                                        onChange={handleChange}
                                    />
                                    <label class="form-label" for="form3Example3">Enter food cost</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input
                                        className="form-control"
                                        placeholder="Enter Food sellingPrice"
                                        name="sellingPrice"
                                        value={newFood.sellingPrice}
                                        onChange={handleChange}
                                    />
                                    <label class="form-label" for="form3Example3">Enter food sellingPrice</label>
                                </div>


                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <input type="submit" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    )
}

export default AddFood