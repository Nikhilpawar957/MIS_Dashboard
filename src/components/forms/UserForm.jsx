import React from 'react';
import { useForm } from "react-hook-form";
import Toastr from "../../utils/toastr";
import { useEffect } from 'react';
import { createUserApi } from '../../services';

function UserForm({ dataTable }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const form = document.getElementById("userForm");

    const watch = (field) => {
        return form ? form[field].value : "";
    };

    const formValidation = {
        fullName: {
            required: { value: true, message: "Full Name is required" }
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

    const closeModalProperly = () => {
        const modalEl = document.getElementById("addEditModal");

        if (modalEl) {
            const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl);

            modalEl.addEventListener(
                "hidden.bs.modal",
                () => {
                    document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
                    document.body.classList.remove("modal-open");
                    document.body.style.overflow = "auto";
                    document.body.style.paddingRight = "0px";
                },
                { once: true }
            );

            modalInstance.hide();
        }
    };

    useEffect(() => {
        return () => {
            document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
            document.body.classList.remove("modal-open");
            document.body.style.overflow = "auto";
        };
    }, []);

    const onSubmit = (data) => {
        createUserApi(data).then(() => {
            Toastr.success("User Added");
            form.reset();
            closeModalProperly();
            if (dataTable) {
                setTimeout(() => {
                    dataTable.ajax.reload(null, false);
                }, 300);
            }
        }).catch((error) => {
            Toastr.error(error.message || "Something Went Wrong");
        });
    };

    return (
        <form id="userForm" className="modal-content" onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header py-2">
                <h1 className="modal-title fs-3">Add</h1>
                <div className="btn btn-icon btn-sm btn-active-light-danger ms-2" data-bs-dismiss="modal">
                    <i className="ki-duotone ki-cross fs-1">
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>
                </div>
            </div>

            <div className="modal-body">
                <div className="mb-3">
                    <label className="form-label required">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter Full Name eg: John Doe" name="fullName" {...register("fullName", formValidation.fullName)} />
                    <span className="text-danger">{errors.fullName?.message}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label required">Email</label>
                    <input type="email" className="form-control" placeholder="Enter Email eg: johndoe@mail.com" name="email" {...register("email", formValidation.email)} />
                    <span className="text-danger">{errors.email?.message}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label required">Password</label>
                    <input type="password" className="form-control" placeholder="Enter Password" name="password" {...register("password", formValidation.password)} />
                    <span className="text-danger">{errors.password?.message}</span>
                </div>
                <div className="mb-3">
                    <label className="form-label required">Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Enter Confirm Password" name="confirmPassword" {...register("confirmPassword", formValidation.confirmPassword)} />
                    <span className="text-danger">{errors.confirmPassword?.message}</span>
                </div>

            </div>

            <div className="modal-footer py-2">
                <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-sm btn-primary">Save</button>
            </div>
        </form>
    )
}

export default UserForm;