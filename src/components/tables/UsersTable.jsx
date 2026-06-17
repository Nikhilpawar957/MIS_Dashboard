import React from 'react';

function UsersTable() {
    return (
        <div className="card">
            <div className="card-body pt-0">
                <table className="table align-middle table-row-dashed fs-6 gy-5" id="kt_table_users">
                    <thead>
                        <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                            <th className="min-w-125px">Name</th>
                            <th className="min-w-125px">Email</th>
                            <th className="min-w-125px">Role</th>
                            <th className="min-w-125px">Status</th>
                            <th className="text-end min-w-70px">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersTable;