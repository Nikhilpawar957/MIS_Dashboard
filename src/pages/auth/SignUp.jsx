import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerApi } from '../../services';
import Toastr from '../../utils/toastr';

function SignUp() {
    document.title = "MIS - Sign Up";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const form = document.getElementById("signUpForm");
    
    const watch = (field) => {
        return form ? form[field].value : "";
    };

    const validForm = {
        fullName: {
            required:{
                value: true,
                message: "Full Name is required"
            },
        },
        email: {
            required: {
                value: true,
                message: "Email is required"
            },
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address"
            }
        },
        password: {
            required: {
                value: true,
                message: "Password is required"
            },
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
            },
            maxLength: {
                value: 16,
                message: "Password must be at most 16 characters long"
            },
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                message: "Password must contain at least one number, one uppercase letter, and one lowercase letter"
            }
        },
        confirmPassword: {
            required: {
                value: true,
                message: "Confirm Password is required"
            },
            validate: (value) => value === watch("password") || "Passwords do not match"
        }
    };

    const onSubmit = (data) => {
        registerApi(data).then(() =>{
            Toastr.success("Registeration successful!");
            setTimeout(() => {
                navigate("/");
            }, 1500);
            form.reset();
        }).catch((error) => {
            Toastr.error(error.message || "Something went wrong");
        });
    };

    return (
        <>
            <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-500px p-15">
                <div className="d-flex flex-center flex-column flex-column-fluid">
                    <form className="form w-100" noValidate="novalidate" id="signUpForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-5">
                            <h1 className="text-gray-900 fw-bolder mb-1">New User SignUp</h1>
                            <div className="text-gray-500 fw-semibold fs-6">Please enter your details</div>
                        </div>
                        <div className="fv-row mb-8">
                            <label htmlFor="fullName" className="required form-label">Full Name</label>
                            <input type="text" minLength="3" maxLength="100" placeholder="Enter Full Name eg:- John Doe" name="fullName" autoComplete="off"
                                className="form-control form-control-solid" id="fullName" {...register("fullName", validForm.fullName)} />
                            <span className="errors text-danger email-error">{errors.fullName ? errors.fullName.message : null}</span>
                        </div>
                        <div className="fv-row mb-8">
                            <label htmlFor="password" className="required form-label">Email</label>
                            <input type="email" placeholder="Enter Email eg:- abc@mail.com" name="email" autoComplete="off"
                                className="form-control form-control-solid" id="email" {...register("email", validForm.email)} />
                            <span className="errors text-danger email-error">{errors.email ? errors.email.message : null}</span>
                        </div>
                        <div className="fv-row mb-8">
                            <label htmlFor="password" className="required form-label">New Password</label>
                            <input type="password" placeholder="New Password" name="password" autoComplete="off"
                                className="form-control form-control-solid" id="password" {...register("password", validForm.password)} />
                            <span className="errors text-danger email-error">{errors.password ? errors.password.message : null}</span>
                        </div>
                        <div className="fv-row mb-8">
                            <label htmlFor="confirmPassword" className="required form-label">Confirm New Password</label>
                            <input type="password" placeholder="Confirm New Password" name="confirmPassword" autoComplete="off"
                                className="form-control form-control-solid" id="confirmPassword" {...register("confirmPassword", validForm.confirmPassword)} />
                            <span className="errors text-danger email-error">{errors.confirmPassword ? errors.confirmPassword.message : null}</span>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary hover-elevate-down">
                                Sign Up
                            </button>
                        </div>
                        <div className="text-center fs-base fw-semibold mt-4"><a href="/" className="link-primary fs-5">Back to Sign In</a></div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;