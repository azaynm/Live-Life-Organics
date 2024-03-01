import axios from 'axios';
import React from 'react'
import FormData from 'form-data';

import { useState, } from "react";

const API_BASE = "http://localhost:8080";

const AddFood = () => {

    const [newFood, setNewFood] = useState(
        {
            name:'',
            price:'',
            description:'',
            image:'',

        }
    );

    const handleChange = ({target}) => {
        setNewFood({...newFood, [target.name]: target.value});
    }

    const handlePhoto = ({target}) => {
        setNewFood({...newFood, image: target.files[0]});
        console.log(newFood.image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newFood.name);
        formData.append('price', newFood.price);
        formData.append('description', newFood.description);
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
                    <div class="col-md-9 col-lg-6 col-xl-5">

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
                                        placeholder="Enter Food Name"
                                        name="name"
                                        value={newFood.name}
                                        onChange={handleChange}
                                    />
                                    <label class="form-label" for="form3Example3">Enter food name</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input
                                        placeholder="Enter Food Price"
                                        name="price"
                                        value={newFood.price}
                                        onChange={handleChange}
                                    />
                                    <label class="form-label" for="form3Example3">Enter food Price</label>
                                </div>

                                <div class="form-outline mb-4">
                                    <input
                                        placeholder="Enter Food Description"
                                        name="description"
                                        value={newFood.description}
                                        onChange={handleChange}
                                    />
                                    <label class="form-label" for="form3Example3">Enter food description</label>
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