import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import Toastr from "../../utils/toastr";
import { addBrandApi, updateBrandApi, getBrandByIdApi } from '../../services';

function BrandForm({ chains = [], dataTable, selectedBrandId }) {
    const { register, handleSubmit, reset, setValue, clearErrors, formState: { errors } } = useForm({
        defaultValues: { id: "", brandName: "", chainId: "" }
    });

    const formValidation = {
        chainId: { required: { value: true, message: "Select Chain" } },
        brandName: { required: { value: true, message: "Brand Name is required" } }
    };

    useEffect(() => {
        const selectElement = window.$('#chainIdSelect');
        // Listen for the Select2 specific change event
        selectElement.on('change', function (e) {
            const selectedValue = e.target.value;

            // Manually set the value in React Hook Form
            setValue("chainId", selectedValue);

            // If they selected something, clear the error!
            if (selectedValue) {
                clearErrors("chainId");
            }
        });

        // Cleanup listener when component unmounts
        return () => {
            selectElement.off('change');
        };
    }, [setValue, clearErrors]);

    useEffect(() => {
        if (selectedBrandId) {
            getBrandByIdApi(selectedBrandId)
                .then((response) => {
                    const brandData = response.data || response;
                    reset({
                        id: brandData.id,
                        brandName: brandData.brandName,
                        chainId: brandData.chainId
                    });

                    setTimeout(() => {
                        window.$('#chainIdSelect')
                            .val(brandData.chainId)
                            .trigger('change'); // <-- Crucial: Select2 won't update visually without this
                    }, 0);
                })
                .catch((error) => {
                    Toastr.error(error.message || "Failed to load brand data");
                });
        } else {
            reset({ id: "", brandName: "", chainId: "" });
            setTimeout(() => {
                window.$('#chainIdSelect')
                    .trigger('change'); // <-- Crucial: Select2 won't update visually without this
            }, 0);
        }
    }, [selectedBrandId, reset]);

    const closeModalProperly = () => {
        const modalEl = document.getElementById("addEditModal");
        if (modalEl) {
            const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl);

            modalEl.addEventListener("hidden.bs.modal", () => {
                document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
                document.body.classList.remove("modal-open");
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = "0px";
                reset({ id: "", name: "" });
            }, { once: true });

            modalInstance.hide();
        }
    };

    const onSubmit = async (data) => {
        const payload = { brandName: data.brandName, chainId: data.chainId };

        try {
            if (data.id) {
                await updateBrandApi(data.id, payload);
                Toastr.success("Brand updated successfully");
            } else {
                await addBrandApi(payload);
                Toastr.success("Brand created successfully");
            }

            closeModalProperly();
            if (dataTable) {
                dataTable.ajax.reload(null, false);
            }
        } catch (error) {
            Toastr.error(error.message || "Something went wrong");
        }
    };

    return (
        <>
            <form id="brandForm" className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-header py-2">
                    <h1 className="modal-title fs-3">{selectedBrandId ? "Edit Brand" : "Add Brand"}</h1>
                    <div className="btn btn-icon btn-sm btn-active-light-danger ms-2" data-bs-dismiss="modal">
                        <i className="ki-duotone ki-cross fs-1">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                    </div>
                </div>

                <div className="modal-body">
                    <input type="hidden" {...register("id")} />
                    <div className="mb-3">
                        <label className="form-label required">Chain</label>
                        <select id="chainIdSelect"
                            className={`form-select ${errors.chainId ? 'is-invalid' : ''}`}
                            {...register("chainId", formValidation.chainId)}
                        >
                            <option value="">Select Chain</option>
                            {chains.map((c) => (
                                <option key={"chain_" + c.id} value={c.id}>
                                    {c.companyName}
                                </option>
                            ))}
                        </select>
                        {errors.chainId && <div className="invalid-feedback">{errors.chainId.message}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label required">Brand Name</label>
                        <input
                            type="text" maxLength="150"
                            className={`form-control ${errors.brandName ? 'is-invalid' : ''}`}
                            placeholder="Enter Brand Name" autoComplete="off"
                            {...register("brandName", formValidation.brandName)}
                        />
                        {errors.brandName && <div className="invalid-feedback">{errors.brandName.message}</div>}
                    </div>
                </div>

                <div className="modal-footer py-2">
                    <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-sm btn-primary">Save</button>
                </div>
            </form>
        </>
    )
}

export default BrandForm