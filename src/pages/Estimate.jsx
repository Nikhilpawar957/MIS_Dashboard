import React, { useState, useEffect } from 'react';
import EstimatesTable from '../components/tables/EstimatesTable';
import toastr from "toastr";
import { getAllBrandsApi, getAllGroupsApi, getAllChainsApi, getAllZonesApi } from '../services';
import EstimateForm from '../components/forms/EstimateForm';

function Estimate() {
    const [dataTable, setDataTable] = useState(null);

    const [selectedEstimateId, setSelectedEstimateId] = useState(null);

    const [zones, setZones] = useState([]);
    const [brands, setBrands] = useState([]);
    const [groups, setGroups] = useState([]);
    const [chains, setChains] = useState([]);

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

        getAllChainsApi().then((response) => {
            if (response.data) {
                // Update state with the fetched array
                setChains(response.data);
            }
        })
            .catch((error) => {
                console.error("Error Fetching Chains", error);
            });

        getAllBrandsApi()
            .then((response) => {
                if (response.data) {
                    // Update state with the fetched array
                    setBrands(response.data);
                }
            })
            .catch((error) => {
                console.error("Error Fetching Brands", error);
            });

        getAllZonesApi()
            .then((response) => {
                if (response.data) {
                    // Update state with the fetched array
                    setZones(response.data);
                }
            })
            .catch((error) => {
                console.error("Error Fetching Brands", error);
            });
    }, []);

    useEffect(() => {
        const modalElement = document.getElementById("addEditModal");

        const handleModalHidden = () => {
            // Wipes the ID clean. Next time you click edit, it's a guaranteed state change.
            setSelectedEstimateId(null);
        };

        if (modalElement) {
            modalElement.addEventListener("hidden.bs.modal", handleModalHidden);
        }

        // Cleanup listener on unmount
        return () => {
            if (modalElement) {
                modalElement.removeEventListener("hidden.bs.modal", handleModalHidden);
            }
        };
    }, []);

    document.title = "MIS - Estimate";

    const handleAddNew = () => {
        setSelectedEstimateId(null); // Clears the ID so the form knows it's a fresh entry
    };
    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex fw-bold fs-3 flex-column justify-content-center my-0">Estimate</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-light">
                                <a href="/dashboard" className="text-light text-hover-primary">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-light w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-light">Estimate</li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                        {/* UPDATED: Add onClick to clear the state when opening the modal natively */}
                        <button
                            className="btn btn-sm fw-bold btn-primary hover-elevate-down"
                            data-bs-toggle="modal"
                            data-bs-target="#addEditModal"
                            onClick={handleAddNew}
                        >
                            Add New
                        </button>
                    </div>
                </div>
            </div>

            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-fluid">
                    <EstimatesTable
                        zones={zones}
                        brands={brands}
                        chains={chains}
                        groups={groups}
                        onTableReady={setDataTable}
                        onEditClick={setSelectedEstimateId}
                    />
                </div>
            </div>

            <div className="modal modal-lg fade" id="addEditModal" tabIndex="-1" aria-labelledby="addEditModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    {/* UPDATED: Pass the selected ID down to the form */}
                    <EstimateForm
                        groups={groups}
                        dataTable={dataTable}
                        toastr={toastr}
                        selectedEstimateId={selectedEstimateId}
                    />
                </div>
            </div>
        </>
    );
}

export default Estimate