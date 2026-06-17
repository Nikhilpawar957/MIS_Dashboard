import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

function UsersTable() {
    const tableRef = useRef();
    const dataTableRef = useRef(null);

    useEffect(() => {
        if (!$.fn.DataTable.isDataTable(tableRef.current)) {
            const token = localStorage.getItem("authToken");
            dataTableRef.current = $(tableRef.current).DataTable({
                processing: true,
                serverSide: true,
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
                            return `
                                <div class="d-flex justify-content-end">
                                <button class="btn btn-icon btn-sm btn-active-light-primary edit-btn" data-id="${row.id}">
                                    <i class="ki-duotone ki-pencil fs-1">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                    </i>
                                </button>
                                <button class="btn btn-icon btn-sm btn-active-light-danger delete-btn" data-id="${row.id}">
                                    <i class="ki-duotone ki-trash fs-1">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                        <span class="path3"></span>
                                        <span class="path4"></span>
                                        <span class="path5"></span>
                                    </i>
                                </button>
                                </div>
                            `;
                        },
                    },
                ],
            });

            // Edit Click
            $(tableRef.current).on("click", ".edit-btn", function () {
                const id = $(this).data("id");
                handleEdit(id);
            });

            // Delete Click
            $(tableRef.current).on("click", ".delete-btn", function () {
                const id = $(this).data("id");
                handleDelete(id);
            });
        }

        return () => {
            // DON'T destroy on every render
            // Only destroy if really unmounting permanently
        };
    }, []);

    const handleEdit = (id) => {
        alert("Edit user ID: " + id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, {
            method: "DELETE",
        });

        dataTableRef.current.ajax.reload();
    };

    return (
        <div className="card">
            <div className="card-body pt-0">
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