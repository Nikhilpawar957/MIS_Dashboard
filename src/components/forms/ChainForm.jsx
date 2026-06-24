import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Toastr from "../../utils/toastr";
import { addChainApi, updateChainApi, getChainByIdApi, getAllGroupsApi } from '../../services';

function ChainForm({ dataTable, selectedChainId }) {
  const { register, handleSubmit, reset, setValue, clearErrors, formState: { errors } } = useForm({
    defaultValues: { id: "", companyName: "", gstNumber: "", customerGroupId: "" }
  });

  // 1. Add state to hold your groups data
  const [groups, setGroups] = useState([]);

  const formValidation = {
    customerGroupId: { required: { value: true, message: "Select Group" } },
    companyName: { required: { value: true, message: "Company Name is required" } },
    gstNumber: {
      required: { value: true, message: "GST Number is required" },
      pattern: {
        value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        message: "Invalid GST Number"
      }
    }
  };
  const selectElement = window.$('#customerGroupIdSelect');

  useEffect(() => {
    // Listen for the Select2 specific change event
    selectElement.on('change', function (e) {
      const selectedValue = e.target.value;

      // Manually set the value in React Hook Form
      setValue("customerGroupId", selectedValue);

      // If they selected something, clear the error!
      if (selectedValue) {
        clearErrors("customerGroupId");
      }
    });

    // Cleanup listener when component unmounts
    return () => {
      selectElement.off('change');
    };
  }, [setValue, clearErrors]);

  // Fetch Chain Data for Edit Mode
  useEffect(() => {
    if (selectedChainId) {
      getChainByIdApi(selectedChainId)
        .then((response) => {
          const chainData = response.data || response;
          reset({
            id: chainData.id,
            companyName: chainData.companyName,
            gstNumber: chainData.gstNumber,
            customerGroupId: chainData.customerGroupId
          });

          setTimeout(() => {
            window.$('#customerGroupIdSelect')
              .val(chainData.groupId)
              .trigger('change'); // <-- Crucial: Select2 won't update visually without this
          }, 0);
        })
        .catch((error) => {
          Toastr.error(error.message || "Failed to load chain data");
        });
    } else {
      reset({ id: "", companyName: "", gstNumber: "", customerGroupId: "" });
      setTimeout(() => {
        window.$('#customerGroupIdSelect')
          .trigger('change'); // <-- Crucial: Select2 won't update visually without this
      }, 0);
    }
  }, [selectedChainId, reset]);

  // 2. Wrap group fetching in a useEffect so it only runs once on mount
  useEffect(() => {
    getAllGroupsApi()
      .then((response) => {
        if (response.data) {
          // Update state with the fetched array
          setGroups(response.data);
        }
      })
      .catch((error) => {
        console.error("Error Fetching Groups", error);
      });
  }, []); // Empty dependency array means this runs once on mount

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
    const payload = { companyName: data.companyName, gstNumber: data.gstNumber, customerGroupId: data.customerGroupId };

    try {
      if (data.id) {
        await updateChainApi(data.id, payload);
        Toastr.success("Chain updated successfully");
      } else {
        await addChainApi(payload);
        Toastr.success("Chain created successfully");
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
      <form id="chainForm" className="modal-content" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-header py-2">
          <h1 className="modal-title fs-3">{selectedChainId ? "Edit Chain" : "Add Chain"}</h1>
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
            <label className="form-label required">Group</label>
            <select id="customerGroupIdSelect" 
              className={`form-select ${errors.customerGroupId ? 'is-invalid' : ''}`}
              {...register("customerGroupId", formValidation.customerGroupId)}
            >
              <option value="">Select Group</option>
              {groups.map((g) => (
                <option key={"group_" + g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            {errors.customerGroupId && <div className="invalid-feedback">{errors.customerGroupId.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label required">Company Name</label>
            <input
              type="text" maxLength="150"
              className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
              placeholder="Enter Company Name" autoComplete="off"
              {...register("companyName", formValidation.companyName)}
            />
            {errors.companyName && <div className="invalid-feedback">{errors.companyName.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label required">GST Number</label>
            <input
              type="text" maxLength="20" pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
              className={`form-control ${errors.gstNumber ? 'is-invalid' : ''}`}
              placeholder="Enter GST Number" autoComplete="off"
              {...register("gstNumber", formValidation.gstNumber)}
            />
            {errors.gstNumber && <div className="invalid-feedback">{errors.gstNumber.message}</div>}
          </div>
        </div>

        <div className="modal-footer py-2">
          <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-sm btn-primary">Save</button>
        </div>
      </form>
    </>
  );
}

export default ChainForm;