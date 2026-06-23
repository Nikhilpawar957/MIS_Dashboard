import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import Toastr from "../../utils/toastr";
import { addGroupApi, updateGroupApi, getGroupByIdApi } from '../../services';

function GroupForm({ dataTable, selectedGroupId }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { id: "", name: "" }
    });

    const formValidation = {
        name: { required: { value: true, message: "Name is required" } },
    };

    // React to the parent's state change
    useEffect(() => {
        if (selectedGroupId) {
            // Edit Mode: Fetch fresh data from API
            getGroupByIdApi(selectedGroupId)
                .then((response) => {
                    const groupData = response.data || response;
                    // Natively loads data into React Hook Form
                    reset({
                        id: groupData.id,
                        name: groupData.name
                    });
                })
                .catch((error) => {
                    Toastr.error(error.message || "Failed to load group data");
                });
        } else {
            // Add Mode: Reset to completely blank inputs
            reset({ id: "", name: "" });
        }
    }, [selectedGroupId, reset]);

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
        const payload = { name: data.name };
        
        try {
            if (data.id) {
                await updateGroupApi(data.id, payload);
                Toastr.success("Group updated successfully");
            } else {
                await addGroupApi(payload);
                Toastr.success("Group created successfully");
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
        <form id="groupForm" className="modal-content" onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header py-2">
                <h1 className="modal-title fs-3">{selectedGroupId ? "Edit Group" : "Add Group"}</h1>
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
                    <label className="form-label required">Group Name</label>
                    <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                        placeholder="Enter Name" autoComplete="off"
                        {...register("name", formValidation.name)} 
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
            </div>

            <div className="modal-footer py-2">
                <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-sm btn-primary">Save</button>
            </div>
        </form>
    );
}

export default GroupForm;