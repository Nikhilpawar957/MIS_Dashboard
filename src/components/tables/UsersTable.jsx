import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Swal from "sweetalert2";
import Toastr from "../../utils/toastr";
import { getUserByIdApi, changeUserStatusApi } from "../../services";

function UsersTable({ onTableReady }) {
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
                    url: `${process.env.REACT_APP_API_BASE_URL}/users/datatables`,
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
                    { data: "fullName" },
                    { data: "email" },
                    { data: "role" },
                    { data: "status" },
                    {
                        data: null,
                        orderable: false,
                        render: function (data, type, row) {
                            let changeStatusButton = ``;
                            if (row.status == "INACTIVE") {
                                changeStatusButton += `
                                    <button class="btn btn-icon btn-sm btn-active-light-danger change-status-btn" data-id="${row.id}" data-status="ACTIVE" data-bs-toggle="tooltip" data-bs-placement="top" title="Activate">
                                    <i class="fas fa-check-circle text-success fs-1"></i>
                                </button>
                                `;
                            } else {
                                changeStatusButton += `
                                <button class="btn btn-icon btn-sm btn-active-light-danger change-status-btn" data-id="${row.id}" data-status="INACTIVE" data-bs-toggle="tooltip" data-bs-placement="top" title="Deactivate">
                                    <i class="fas fa-times-circle text-danger fs-1"></i>
                                </button>
                                `;
                            }
                            return `
                                <div class="d-flex justify-content-end">
                                <button class="d-none btn btn-icon btn-sm btn-active-light-primary edit-btn" data-id="${row.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                                    <i class="ki-duotone ki-eye fs-1">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                        <span class="path3"></span>
                                    </i>
                                </button>
                                ${changeStatusButton}
                                </div>
                            `;
                        },
                    },
                ],
            });

            if (onTableReady) {
                onTableReady(dataTableRef.current);
            }

            $(tableRef.current).on("click", ".edit-btn", function () {
                const id = $(this).data("id");
                handleView(id);
            });

            $(tableRef.current).on("click", ".change-status-btn", function () {
                const id = $(this).data("id");
                const status = $(this).data("status");
                handleChangeStatus(id, status);
            });
        }

        return () => {
            // DON'T destroy on every render
            // Only destroy if really unmounting permanently
        };
    }, [onTableReady]);

    const handleView = (id) => {
        getUserByIdApi(id).then((response) => {
            if(response.data){

            }
        }).catch((error) => {
            Toastr.error(error.message || "Something Went Wrong");
        });
        dataTableRef.current.ajax.reload();
    };

    const handleChangeStatus = async (id, status) => {

        Swal.fire({
            title: "Change status to " + status,
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes",
        }).then((result) => {
            const payload = {
                id, status
            };
            changeUserStatusApi(payload).then((response) => {
                Toastr.success("Status changed to " + status);
                dataTableRef.current.ajax.reload();
            }).catch((error) => {
                Toastr.error(error.message || "Something Went Wrong");
            });
        });

    }

    const handleDelete = async (id) => {


        dataTableRef.current.ajax.reload();
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
                            <th className="min-w-125px">Name</th>
                            <th className="min-w-125px">Email</th>
                            <th className="min-w-125px">Role</th>
                            <th className="min-w-125px">Status</th>
                            <th className="text-end min-w-70px">Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
}

export default UsersTable;