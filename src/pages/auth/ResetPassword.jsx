import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '../../services/index';
import Toastr from '../../utils/toastr';

function ResetPassword() {
    document.title = "MIS - Reset Password";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const form = document.getElementById("resetPasswordForm");
    
    const watch = (field) => {
        return form ? form[field].value : "";
    };

    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
        Toastr.error("Invalid password reset link");
        navigate("/");
    }

    const validForm = {
        otp: {
            required: {
                value: true,
                message: "OTP is required"
            },
            minLength: {
                value: 6,
                message: "OTP must be 6 characters long"
            },
            maxLength: {
                value: 6,
                message: "OTP must be 6 characters long"
            },
            pattern: {
                value: /^\d{6}$/,
                message: "OTP must be a 6-digit number"
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
        resetPasswordApi(data).then(() => {
            Toastr.success("Password reset successful!");
            setTimeout(() => {
                navigate("/signin");
            }, 1500);
        }).catch((error) => {
            Toastr.error(error.message || "Failed to send reset link");
        });
        form.reset();
    };

    return (
        <>
            <div className="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-500px p-15">
                <div className="d-flex flex-center flex-column flex-column-fluid">
                    <form className="form w-100" noValidate="novalidate" id="resetPasswordForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-5">
                            <h1 className="text-gray-900 fw-bolder mb-1">Reset Password</h1>
                            <div className="text-gray-500 fw-semibold fs-6">Please enter your new password</div>
                        </div>
                        <input type="hidden" name="token" value={token} {...register("token")} />
                        <div className="fv-row mb-8">
                            <label htmlFor="otp" className="required form-label">OTP</label>
                            <input type="text" minLength="6" maxLength="6" placeholder="OTP" name="otp" autoComplete="off"
                                className="form-control form-control-solid" id="otp" {...register("otp", validForm.otp)} />
                            <span className="errors text-danger email-error">{errors.otp ? errors.otp.message : null}</span>
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
                                Reset Password
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;