import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Home.css';
import Dropzone from './Dropzone';
import SideNav from './SideNav';
//::::::::::::::::::::::::::::::::::::::::::::

const Home = () => {
    const [success, setSuccess] = useState(false)
    const [employee, setEmployee] = useState({});
    const { register, handleSubmit, watch, formState: { errors }
    } = useForm();

    // When form submitted:
    const onSubmit = (data) => {
        let employee = JSON.stringify(data);
        // console.log(data)
        fetch("https://immense-sea-72965.herokuapp.com/customers", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: employee,
        })
            .then((res) => res.json())
            .then((data) => {
                setSuccess(true);
                // console.log(data)
                // console.log((success));
            });
    };


    return (
        <div className="container-fluid mx-0 px-0 gx-0">
            <div className="row mx-0 px-0 gx-0">
                <div className="col-md-3">
                    <SideNav />
                </div>
                <div className="col-md-9 right-side">
                    <div className="row justify-content-end main-container gx-0">
                        <div className="header">
                            <a href="/" className="logo">Add Employee</a>
                            {/* <div className="header-right">
                                <a className="active" href="#home">LOG OUT</a>
                            </div> */}
                        </div>
                    </div>

                    <div className="row justify-content-center mt-3">
                        {
                            success ? (
                                <div className="col-md-8 alert alert-success" role="alert">
                                    <span><i class="fas fa-check-circle"></i> Employee successfully added!</span>
                                </div>
                            ) : ''
                        }
                    </div>
                    <div className="row m-0 p-0 justify-content-center mt-5">
                        <div className="col-md-10 entry-form p-5">
                            <h4>Add Employee</h4>
                            <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                <div class="col-md-6">
                                    <label for="first_name" className="form-label">First Name</label>
                                    <input type="text" name="first_name" className="form-control" id="first_name"
                                        {...register("first_name", { required: true })} />
                                    {errors.first_name && <span><i class="fas fa-exclamation-triangle"></i> This field is required</span>}
                                </div>
                                <div className="col-md-6">
                                    <label for="last_name" className="form-label">Last Name</label>
                                    <input type="text" name="last_name" className="form-control" id="last_name"
                                        {...register("last_name", { required: true })} />
                                    {errors.last_name && <span><i class="fas fa-exclamation-triangle"></i> This field is required</span>}
                                </div>
                                <div class="col-12">
                                    <label for="email" className="form-label">Email Address</label>
                                    <input type="email" name="email" className="form-control" id="email"
                                        placeholder="username@domain.com"
                                        {...register("email", {
                                            required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        })}
                                    />
                                    {errors.email && <span className="error"><i class="fas fa-exclamation-triangle"></i> This field is required</span>}
                                    {errors?.lastName?.type === "pattern" && (
                                        <p>Please enter valid email</p>
                                    )}
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="btn btn-submit">Sign in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-10 new-notification-header">
                            <div className="new-notification-title">
                                <p></p>
                                <h4>OR</h4>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-10 justify-content-center">
                            <Dropzone />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;