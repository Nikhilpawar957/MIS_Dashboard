import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Swal from "sweetalert2";
import Toastr from "../../utils/toastr";
import { deleteEstimateByIdApi } from "../../services";

function EstimatesTable({ zones = [], brands = [], chains = [], groups = [], onTableReady, onEditClick }) {

    const tableRef = useRef();
    const dataTableRef = useRef(null);

    const [selectedGroupId, setSelectedGroupId] = useState("");
    const [selectedChainId, setSelectedChainId] = useState("");
    const [selectedBrandId, setSelectedBrandId] = useState("");
    const [selectedZoneId, setSelectedZoneId] = useState("");

    const onEditClickRef = useRef(onEditClick);
    useEffect(() => {
        onEditClickRef.current = onEditClick;
    }, [onEditClick]);

    useEffect(() => {
        if (!tableRef.current) return;

        const token = localStorage.getItem("authToken");

        dataTableRef.current = $(tableRef.current).DataTable({
            processing: true,
            serverSide: true,
            destroy: true,
            order: [],
            aLengthMenu: [
                [10, 15, 25, 50, 100, -1],
                [10, 15, 25, 50, 100, "All"]
            ],
            ajax: {
                url: `${process.env.REACT_APP_API_BASE_URL}/estimates/datatables`,
                type: "POST",
                contentType: "application/json",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: function (d) {
                    // Pass BOTH filters to the Spring Boot DTO
                    d.customFilters = {
                        zoneId: selectedZoneId || null,
                        brandId: selectedBrandId || null,
                        groupId: selectedGroupId || null,
                        chainId: selectedChainId || null
                    };
                    return JSON.stringify(d);
                },
            },
            columns: [
                {
                    data: null,
                    orderable: false,
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { data: "groupName" },
                { data: "companyName" },
                { data: "brandName" },
                { data: "zoneName" },
                { data: "serviceDetails" },
                { data: "costPerUnit" },
                { data: "qty" },
                { data: "totalCost" },
                {
                    data: "deliveryDate", // The date field from your API
                    render: function (data, type, row) {
                        // Only format the data if it is being rendered for display or filtering
                        if (type === 'display' || type === 'filter') {
                            if (!data) return ''; // Handle null or empty dates

                            const date = new Date(data);

                            // Format to "Feb 28, 2026"
                            return new Intl.DateTimeFormat('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            }).format(date);
                        }

                        // Return raw data for sorting ('sort' type)
                        return data;
                    }
                },
                {
                    data: null,
                    orderable: false,
                    render: function (data, type, row) {
                        return `
                            <div class="d-flex justify-content-end">
                              <button class="btn btn-icon btn-sm btn-active-light-primary edit-btn" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                                  <i class="ki-duotone ki-pencil fs-1">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                      <span class="path3"></span>
                                  </i>
                              </button>
                              <button class="btn btn-icon btn-sm btn-active-light-danger delete-btn" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                                  <i class="ki-duotone ki-trash fs-1">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                      <span class="path3"></span>
                                      <span class="path4"></span>
                                  </i>
                              </button>
                              </div>
                        `;
                    },
                },
            ],
        });

        if (onTableReady) {
            onTableReady(dataTableRef.current);
        }

        $(tableRef.current).off("click.estimatesTable").on("click.estimatesTable", ".edit-btn", function () {

            const id = $(this).data("id");
            console.log(id);
            if (onEditClickRef.current) {
                onEditClickRef.current(id);
            }
            const modalEl = document.getElementById("addEditModal");
            if (modalEl) {
                const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
                modalInstance.show();
            }
        });

        $(tableRef.current).on("click.estimatesTable", ".delete-btn", function () {
            const id = $(this).data("id");
            handleDelete(id);
        });
    }, [selectedGroupId, selectedChainId, selectedBrandId, selectedZoneId, onTableReady]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Confirm Delete",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEstimateByIdApi(id)
                    .then((response) => {
                        Toastr.success(response.message);
                        dataTableRef.current.ajax.reload(null, false);
                    })
                    .catch((error) => {
                        Toastr.error(error.message || "Something Went Wrong");
                    });
            }
        });
    };

    return (
        <div className="card">
            <div className="card-header border-0 pt-6 d-flex justify-content-between align-items-center">
                <div className="card-title m-0">
                    <h3 className="fw-bolder m-0">Estimates List</h3>
                </div>

                {/* Flex container for the two dropdowns */}
                <div className="card-toolbar d-flex gap-3">
                    <label htmlFor="" className="form-label me-4 fs-4 mt-1">Filter:</label>
                    <select
                        className="form-select form-select-sm form-select-solid w-200px"
                        value={selectedZoneId}
                        onChange={(e) => setSelectedZoneId(e.target.value)}
                    >
                        <option value="">All Zones</option>
                        {zones.map((z) => <option key={z.id} value={z.id}>{z.zoneName}</option>)}
                    </select>

                    <select
                        className="form-select form-select-sm form-select-solid w-200px"
                        value={selectedBrandId}
                        onChange={(e) => setSelectedBrandId(e.target.value)}
                    >
                        <option value="">All Brands</option>
                        {brands.map((b) => <option key={b.id} value={b.id}>{b.brandName}</option>)}
                    </select>

                    <select
                        className="form-select form-select-sm form-select-solid w-200px"
                        value={selectedGroupId}
                        onChange={(e) => setSelectedGroupId(e.target.value)}
                    >
                        <option value="">All Groups</option>
                        {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>

                    <select
                        className="form-select form-select-sm form-select-solid w-200px"
                        value={selectedChainId}
                        onChange={(e) => setSelectedChainId(e.target.value)}
                    >
                        <option value="">All Chains</option>
                        {chains.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                    </select>
                </div>
            </div>

            <div className="card-body pt-0">
                <table ref={tableRef} className="table align-middle table-row-dashed fs-6 gy-2 mb-0" style={{ width: "100%" }}>
                    <thead>
                        <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                            <th className="w-10px pe-2">#</th>
                            <th>Group</th>
                            <th>Chain</th>
                            <th>Brand</th>
                            <th>Zone</th>
                            <th>Service Details</th>
                            <th>Cost/Unit</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Delivery Date</th>
                            <th className="text-end min-w-70px">Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default EstimatesTable