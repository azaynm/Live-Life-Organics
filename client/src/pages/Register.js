import React from 'react'
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
const API_BASE = "http://localhost:8080";


const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordre, setPasswordRe] = useState("");

    const validatePassword = ()=>{
        if(password == passwordre){
            addUser();
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Passwords don't match",
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }
    }

    const addUser = async () => {


        const user = {
            userName: userName,
            email: email,
            password: password,
            password: passwordre
        };
        const headers = {
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
        };
        axios.post( API_BASE+'/api/signUp', user, { headers })
        .then((res)=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Account created Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
            
        }).catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        })

    }
    return (
        <section class="vh-100">
            <div class="container-fluid h-custom h-100">
                <div class="row d-flex justify-content-center align-items-center h-100s h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            class="img-fluid" alt="Sample image" />
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>

                            <div class="form-outline mb-4">
                                <input type="username" id="form3Example3" class="form-control form-control-lg"
                                    placeholder="Enter a username"
                                    onChange={e => setUserName(e.target.value)}
                                    value={userName}
                                />
                                <label class="form-label" for="form3Example3">Username</label>
                            </div>


                            <div class="form-outline mb-4">
                                <input type="email" id="form3Example3" class="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                                <label class="form-label" for="form3Example3">Email address</label>
                            </div>


                            <div class="form-outline mb-3">
                                <input type="password" id="form3Example4" class="form-control form-control-lg"
                                    placeholder="Enter password"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                                <label class="form-label" for="form3Example4">Password</label>
                            </div>

                            <div class="form-outline mb-3">
                                <input type="password" id="form3Example4" class="form-control form-control-lg"
                                    placeholder="Enter password again"
                                    onChange={e => setPasswordRe(e.target.value)}
                                    value={passwordre}
                                />
                                <label class="form-label" for="form3Example4">Password</label>
                            </div>

                            <div class="d-flex justify-content-between align-items-center">


                                <a href="#!" class="text-body">Forgot password?</a>
                            </div>

                            <div class="text-center text-lg-start mt-4 pt-2">
                                <button type="button" class="btn btn-primary btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} onClick={validatePassword}>Register</button>
                                <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#!"
                                    class="link-danger">Login</a></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Register