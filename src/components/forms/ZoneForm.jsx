import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import Toastr from "../../utils/toastr";
import { addZoneApi, updateZoneApi, getZoneByIdApi } from '../../services';

function ZoneForm({ brands = [], dataTable, selectedZoneId }) {

  const { register, handleSubmit, reset, setValue, clearErrors, formState: { errors } } = useForm({
    defaultValues: { id: "", zoneName: "", brandId: "" }
  });

  const formValidation = {
    brandId: { required: { value: true, message: "Select Brand" } },
    zoneName: { required: { value: true, message: "Zone Name is required" } }
  };

  useEffect(() => {
    const selectElement = window.$('#brandIdSelect');
    // Listen for the Select2 specific change event
    selectElement.on('change', function (e) {
      const selectedValue = e.target.value;

      // Manually set the value in React Hook Form
      setValue("brandId", selectedValue);

      // If they selected something, clear the error!
      if (selectedValue) {
        clearErrors("brandId");
      }
    });

    // Cleanup listener when component unmounts
    return () => {
      selectElement.off('change');
    };
  }, [setValue, clearErrors]);

  useEffect(() => {
    if (selectedZoneId) {
      getZoneByIdApi(selectedZoneId)
        .then((response) => {
          const zoneData = response.data || response;
          reset({
            id: zoneData.id,
            zoneName: zoneData.zoneName,
            brandId: zoneData.brandId
          });

          setTimeout(() => {
            window.$('#brandIdSelect')
              .val(zoneData.brandId)
              .trigger('change'); // <-- Crucial: Select2 won't update visually without this
          }, 0);
        })
        .catch((error) => {
          Toastr.error(error.message || "Failed to load zone data");
        });
    } else {
      reset({ id: "", zoneName: "", brandId: "" });
      setTimeout(() => {
        window.$('#brandIdSelect')
          .trigger('change'); // <-- Crucial: Select2 won't update visually without this
      }, 0);
    }
  }, [selectedZoneId, reset]);

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
    const payload = { zoneName: data.zoneName, brandId: data.brandId };

    try {
      if (data.id) {
        await updateZoneApi(data.id, payload);
        Toastr.success("Zone updated successfully");
      } else {
        await addZoneApi(payload);
        Toastr.success("Zone created successfully");
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
      <form id="zoneForm" className="modal-content" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-header py-2">
          <h1 className="modal-title fs-3">{selectedZoneId ? "Edit Zone" : "Add Zone"}</h1>
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
            <label className="form-label required">Brand</label>
            <select id="brandIdSelect"
              className={`form-select ${errors.brandId ? 'is-invalid' : ''}`}
              {...register("brandId", formValidation.brandId)}
            >
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option key={"brand_" + b.id} value={b.id}>
                  {b.brandName}
                </option>
              ))}
            </select>
            {errors.brandId && <div className="invalid-feedback">{errors.brandId.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label required">Zone Name</label>
            <input
              type="text" maxLength="150"
              className={`form-control ${errors.zoneName ? 'is-invalid' : ''}`}
              placeholder="Enter Zone Name" autoComplete="off"
              {...register("zoneName", formValidation.zoneName)}
            />
            {errors.zoneName && <div className="invalid-feedback">{errors.zoneName.message}</div>}
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

export default ZoneForm