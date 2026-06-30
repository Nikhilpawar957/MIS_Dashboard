import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Toastr from "../../utils/toastr";
import { addEstimateApi, updateEstimateApi, getEstimateByIdApi, getAllChainsByGroupIdApi, getAllBrandsByChainIdApi, getAllZonesByBrandIdApi } from '../../services';

function EstimateForm({ groups = [], dataTable, selectedEstimateId }) {
    const { register, handleSubmit, reset, setValue, watch, clearErrors, formState: { errors } } = useForm({
        defaultValues: { id: "", groupId: "", chainId: "", brandId: "", zoneId: "", serviceDetails: "", costPerUnit: "", qty: "", totalCost: "", deliveryDate: "", deliveryDetails: "" }
    });

    const today = new Date().toISOString().split("T")[0];

    const costPerUnit = watch("costPerUnit");
    const qty = watch("qty");

    useEffect(() => {
        setValue("totalCost", (costPerUnit || 0) * (qty || 0));
    }, [costPerUnit, qty, setValue]);

    const [chains, setChains] = useState([]);
    const [brands, setBrands] = useState([]);
    const [zones, setZones] = useState([]);

    const loadChains = async (groupId) => {
        if (!groupId) {
            setChains([]);
            setBrands([]);
            setZones([]);
            return;
        }

        const res = await getAllChainsByGroupIdApi(groupId);
        setChains(res.data);
    };

    const loadBrands = async (chainId) => {
        if (!chainId) {
            setBrands([]);
            setZones([]);
            return;
        }

        const res = await getAllBrandsByChainIdApi(chainId);
        setBrands(res.data);
    };

    const loadZones = async (brandId) => {
        if (!brandId) {
            setZones([]);
            return;
        }

        const res = await getAllZonesByBrandIdApi(brandId);
        setZones(res.data);
    };

    const formValidation = {
        groupId: { required: { value: true, message: "Select Group" } },
        chainId: { required: { value: true, message: "Select Chain" } },
        brandId: { required: { value: true, message: "Select Brand" } },
        zoneId: { required: { value: true, message: "Select Zone" } },
        serviceDetails: { required: { value: true, message: "Enter Service Details" } },
        costPerUnit: { required: { value: true, message: "Enter Cost Per Unit" }, },
        qty: { required: { value: true, message: "Enter Quantity" } },
        deliveryDate: { required: { value: true, message: "Enter Delivery Date" } },
    };

    useEffect(() => {
        const groupSelectElement = window.$("#groupIdSelect");
        const chainSelectElement = window.$("#chainIdSelect");
        const brandSelectElement = window.$('#brandIdSelect');
        const zoneSelectElement = window.$("#zoneIdSelect");

        groupSelectElement.on("change", async function (e) {
            const groupId = e.target.value;
            setValue("groupId", groupId);
            setValue("chainId", "");
            setValue("brandId", "");
            setValue("zoneId", "");
            if (groupId) {
                clearErrors("groupId");
                await loadChains(groupId);
            }
        });

        chainSelectElement.on("change", async function (e) {
            const chainId = e.target.value;
            setValue("chainId", chainId);
            setValue("brandId", "");
            setValue("zoneId", "");
            if (chainId) {
                clearErrors("chainId");
                await loadBrands(chainId);
            }
        });

        brandSelectElement.on("change", async function (e) {
            const brandId = e.target.value;
            setValue("brandId", brandId);
            setValue("zoneId", "");
            if (brandId) {
                clearErrors("brandId");
                await loadZones(brandId);
            }
        });

        return () => {
            groupSelectElement.off('change');
            chainSelectElement.off('change');
            brandSelectElement.off('change');
            zoneSelectElement.off('change');
        };
    }, [setValue, clearErrors]);

    const closeModalProperly = () => {
        const modalEl = document.getElementById("addEditModal");
        if (modalEl) {
            const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl);

            modalEl.addEventListener("hidden.bs.modal", () => {
                document.querySelectorAll(".modal-backdrop").forEach(el => el.remove());
                document.body.classList.remove("modal-open");
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = "0px";
                reset();
            }, { once: true });

            modalInstance.hide();
        }
    };

    useEffect(() => {
        const loadEstimate = async () => {
            if (!selectedEstimateId) {
                reset();
                return;
            }

            const response = await getEstimateByIdApi(selectedEstimateId);
            const estimate = response.data;

            // load chains first
            await loadChains(estimate.groupId);

            // load brands
            await loadBrands(estimate.chainId);

            // load zones
            await loadZones(estimate.brandId);

            // now set values
            reset({
                id: estimate.id,
                groupId: estimate.groupId,
                chainId: estimate.chainId,
                brandId: estimate.brandId,
                zoneId: estimate.zoneId,
                serviceDetails: estimate.serviceDetails,
                costPerUnit: estimate.costPerUnit,
                qty: estimate.qty,
                totalCost: estimate.totalCost,
                deliveryDate: estimate.deliveryDate?.split("T")[0] || "",
                deliveryDetails: estimate.deliveryDetails
            });

            // update Select2 UI
            window.$("#groupIdSelect").val(estimate.groupId).trigger("change.select2");
            window.$("#chainIdSelect").val(estimate.chainId).trigger("change.select2");
            window.$("#brandIdSelect").val(estimate.brandId).trigger("change.select2");
            window.$("#zoneIdSelect").val(estimate.zoneId).trigger("change.select2");
        };

        if (selectedEstimateId) {
            loadEstimate();
        } else {
            reset({
                id: "",
                groupId: "",
                chainId: "",
                brandId: "",
                zoneId: "",
                serviceDetails: "",
                costPerUnit: "",
                qty: "",
                totalCost: "",
                deliveryDate: "",
                deliveryDetails: ""
            });

            setChains([]);
            setBrands([]);
            setZones([]);
        }

    }, [selectedEstimateId, reset]);

    const onSubmit = async (data) => {
        const payload = { groupId: data.groupId, chainId: data.chainId, brandId: data.brandId, zoneId: data.zoneId, serviceDetails: data.serviceDetails, costPerUnit: data.costPerUnit, qty: data.qty, deliveryDate: data.deliveryDate, deliveryDetails: data.deliveryDetails };

        try {
            if (data.id) {
                await updateEstimateApi(data.id, payload);
                Toastr.success("Estimate updated successfully");
            } else {
                await addEstimateApi(payload);
                Toastr.success("Estimate added successfully");
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
            <form id="estimateForm" className="modal-content" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-header py-2">
                    <h1 className="modal-title fs-3">{selectedEstimateId ? "Edit Estimate" : "Add Estimate"}</h1>
                    <div className="btn btn-icon btn-sm btn-active-light-danger ms-2" data-bs-dismiss="modal">
                        <i className="ki-duotone ki-cross fs-1">
                            <span className="path1"></span>
                            <span className="path2"></span>
                        </i>
                    </div>
                </div>

                <div className="modal-body">
                    <input type="hidden" {...register("id")} />
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Group</label>
                                <select id="groupIdSelect"
                                    className={`form-select ${errors.groupId ? 'is-invalid' : ''}`}
                                    {...register("groupId", formValidation.groupId)}
                                >
                                    <option value="">Select Group</option>
                                    {groups.map((g) => (
                                        <option key={"group_" + g.id} value={g.id}>
                                            {g.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.groupId && <div className="invalid-feedback">{errors.groupId.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Chain</label>
                                <select id="chainIdSelect"
                                    className={`form-select ${errors.chainId ? 'is-invalid' : ''}`}
                                    {...register("chainId", formValidation.chainId)}
                                >
                                    <option value="">Select Chain</option>
                                    {chains.map(chain => (
                                        <option key={chain.id} value={chain.id}>
                                            {chain.companyName}
                                        </option>
                                    ))}
                                </select>
                                {errors.chainId && <div className="invalid-feedback">{errors.chainId.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Brand</label>
                                <select id="brandIdSelect"
                                    className={`form-select ${errors.brandId ? 'is-invalid' : ''}`}
                                    {...register("brandId", formValidation.brandId)}
                                >
                                    <option value="">Select Brand</option>
                                    {brands.map(brand => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.brandName}
                                        </option>
                                    ))}
                                </select>
                                {errors.brandId && <div className="invalid-feedback">{errors.brandId.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label required">Zone</label>
                                <select id="zoneIdSelect"
                                    className={`form-select ${errors.zoneId ? 'is-invalid' : ''}`}
                                    {...register("zoneId", formValidation.zoneId)}
                                >
                                    <option value="">Select Zone</option>
                                    {zones.map(zone => (
                                        <option key={zone.id} value={zone.id}>
                                            {zone.zoneName}
                                        </option>
                                    ))}
                                </select>
                                {errors.zoneId && <div className="invalid-feedback">{errors.zoneId.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label className="form-label required">Service Details</label>
                                <input
                                    type="text" maxLength="150"
                                    className={`form-control ${errors.serviceDetails ? 'is-invalid' : ''}`}
                                    placeholder="Enter Service Details" autoComplete="off"
                                    {...register("serviceDetails", formValidation.serviceDetails)}
                                />
                                {errors.serviceDetails && <div className="invalid-feedback">{errors.serviceDetails.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">Delivery Date</label>
                                <input
                                    type="date"
                                    min={today}
                                    className={`form-control ${errors.deliveryDate ? 'is-invalid' : ''}`}
                                    {...register("deliveryDate", formValidation.deliveryDate)}
                                />
                                {errors.deliveryDate && <div className="invalid-feedback">{errors.deliveryDate.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">Cost Per Unit</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    className={`form-control ${errors.costPerUnit ? 'is-invalid' : ''}`}
                                    {...register("costPerUnit", {
                                        required: "Enter Cost Per Unit",
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: "Cost must be greater than 0"
                                        }
                                    })}
                                />
                                {errors.costPerUnit && <div className="invalid-feedback">{errors.costPerUnit.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label required">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    className={`form-control ${errors.qty ? 'is-invalid' : ''}`}
                                    {...register("qty", {
                                        required: "Enter Quantity",
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: "Quantity must be at least 1"
                                        }
                                    })}
                                />
                                {errors.qty && <div className="invalid-feedback">{errors.qty.message}</div>}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="mb-3">
                                <label className="form-label">Total Cost</label>
                                <input
                                    type="text" maxLength="150"
                                    className="form-control"
                                    placeholder="Total Cost"
                                    {...register("totalCost")}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Other Delivery Details</label>
                                <textarea
                                    className="form-control"
                                    placeholder="Enter Other Delivery Details" autoComplete="off"
                                    {...register("deliveryDetails")} cols={10} rows={5}></textarea>
                            </div>
                        </div>
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
export default EstimateForm;