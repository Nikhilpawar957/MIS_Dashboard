import React from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/use-auth';
import { loginUser } from '../../hooks/use-auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastr from '../../utils/toastr';

function SignIn() {
    document.title = "MIS - Sign In";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();


    const isValidPassword = (value) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters long";
        if (value.length > 16) return "Password must be at most 16 characters long";
        if (!/\d/.test(value)) return "Password must contain at least one number";
        if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
        return true;
    }

    const validForm = {
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
                value: 6,
                message: "Password must be at least 6 characters long"
            }
        }
    };

    const onSubmit = (data) => {
        const passwordValidation = isValidPassword(data.password);
        if (passwordValidation !== true) {
            Toastr.error(passwordValidation);
            return;
        }
        loginUser(data).then(() => {
            Toastr.success("Login successful!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);
        })
            .catch((error) => {
                console.error("Login failed:", error);
                Toastr.error(error.message || "Login failed. Please try again.");
            });
    };

    return (
        <>
            <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-500px p-15">
                <div className="d-flex flex-center flex-column flex-column-fluid">
                    <form className="form w-100" noValidate="novalidate" id="signInForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-5">
                            <h1 className="text-gray-900 fw-bolder mb-1">Welcome</h1>
                            <div className="text-gray-500 fw-semibold fs-6">Please sign in to your account below</div>
                        </div>
                        <div className="fv-row mb-8">
                            <label htmlFor="email" className="required form-label">Email</label>
                            <input type="email" placeholder="Email" name="email" autoComplete="off"
                                className="form-control form-control-solid" id="email" {...register("email", validForm.email)} />
                            <span className="errors text-danger email-error">{errors.email ? errors.email.message : null}</span>
                        </div>
                        <div className="fv-row mb-8" data-kt-password-meter="true">
                            <div className="mb-1">
                                <label className="form-label fw-semibold fs-6 mb-2 required" htmlFor="password">Password</label>
                                <div className="position-relative mb-3">
                                    <input className="form-control form-control-solid" type="password" placeholder="Password" name="password" autoComplete="off" id="password" {...register("password", validForm.password)} />
                                    <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
                                        <i className="ki-duotone ki-eye-slash fs-1"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span></i>
                                        <i className="ki-duotone ki-eye d-none fs-1"><span className="path1"></span><span className="path2"></span><span className="path3"></span></i>
                                    </span>
                                </div>
                            </div>
                            <span className="errors text-danger password-error">{errors.password ? errors.password.message : null}</span>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary hover-elevate-down">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn