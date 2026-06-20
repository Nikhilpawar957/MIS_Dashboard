import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordApi } from '../../services/index';
import Toastr from '../../utils/toastr';

function ForgotPassword() {
    document.title = "MIS - Forgot Password";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const form = document.getElementById("forgotPasswordForm");

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
        }
    };

    const onSubmit = (data) => {
        forgotPasswordApi(data).then(() => {
            Toastr.success("Password reset link sent to your email!");
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
                    <form className="form w-100" noValidate="novalidate" id="forgotPasswordForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-5">
                            <h1 className="text-gray-900 fw-bolder mb-1">Forgot Password</h1>
                            <div className="text-gray-500 fw-semibold fs-6">Please enter your email address to reset your password</div>
                        </div>
                        <div className="fv-row mb-8">
                            <label htmlFor="email" className="required form-label">Email</label>
                            <input type="email" placeholder="Email" name="email" autoComplete="off"
                                className="form-control form-control-solid" id="email" {...register("email", validForm.email)} />
                            <span className="errors text-danger email-error">{errors.email ? errors.email.message : null}</span>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary hover-elevate-down">
                                Send Reset Link
                            </button>
                        </div>
                        <div className="text-center fs-base fw-semibold mt-4"><a href="/" className="link-primary fs-5">Back to Sign In</a></div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;