import React from 'react';

function Error_404() {
    document.title = "MIS - 404 Error";
    return (
        <>
            <div class="d-flex flex-column flex-center text-center p-10">
                <div class="card card-flush w-lg-650px py-5">
                    <div class="card-body py-15 py-lg-20">
                        <h1 class="fw-bolder fs-2hx text-gray-900 mb-4">Oops!</h1>
                        <div class="fw-semibold fs-6 text-gray-500 mb-7">We can't find that page.</div>
                        <div class="mb-3">
                            <img src="/media/auth/404-error.png" class="mw-100 mh-300px" alt="" />
                        </div>
                        <div class="mb-0">
                            <a href="/" class="btn btn-sm btn-primary">Return Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Error_404;