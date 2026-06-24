import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Swal from "sweetalert2";
import Toastr from "../../utils/toastr";
import { deleteChainByIdApi } from "../../services";

function ChainsTable({ onTableReady, onEditClick }) {
    const tableRef = useRef();
    const dataTableRef = useRef(null);

    useEffect(() => {
        if (!$.fn.DataTable.isDataTable(tableRef.current)) {
            const token = localStorage.getItem("authToken");
            dataTableRef.current = $(tableRef.current).DataTable({
                processing: true,
                serverSide: true,
                aLengthMenu: [
                    [10, 15, 25, 50, 100, -1],
                    [10, 15, 25, 50, 100, "All"]
                ],
                ajax: {
                    url: `${process.env.REACT_APP_API_BASE_URL}/chains/datatables`,
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: function (d) {
                        return JSON.stringify(d);
                    },
                },
                columns: [
                    {
                        data: null,
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    { data: "groupName" },
                    { data: "companyName" },
                    { data: "gstNumber" },
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

            // 2. Handle the Edit Click Event
            $(tableRef.current).on("click.chainsTable", ".edit-btn", function () {
                const id = $(this).data("id");

                // Lift state up to Groups.jsx page component
                if (onEditClick) {
                    onEditClick(id);
                }

                // Programmatically pop open the Bootstrap Modal
                const modalEl = document.getElementById("addEditModal");
                if (modalEl) {
                    const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
                    modalInstance.show();
                }
            });

            $(tableRef.current).on("click.chainsTable", ".delete-btn", function () {
                const id = $(this).data("id");
                handleDelete(id);
            });
        }

        return () => {
            // if (dataTableRef.current) {
            //     $(tableRef.current).off(".chainsTable");
            //     dataTableRef.current.destroy(true);
            //     dataTableRef.current = null;
            // }
        };
    }, [onTableReady, onEditClick]); // 3. Add onEditClick to the dependency array

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
                deleteChainByIdApi(id)
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
            <div className="card-body">
                <table
                    ref={tableRef}
                    className="table align-middle table-row-dashed fs-6 gy-2 mb-0"
                    style={{ width: "100%" }}
                >
                    <thead>
                        <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                            <th className="w-10px pe-2">#</th>
                            <th>Group Name</th>
                            <th>Company Name</th>
                            <th>GSTIN</th>
                            <th className="text-end min-w-70px">Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default ChainsTable