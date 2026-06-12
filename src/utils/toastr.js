import toastr from "toastr";
import "toastr/build/toastr.min.css";

// Global config (runs once when imported)
toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
    timeOut: "3000",
    newestOnTop: true,
    preventDuplicates: true,
    zIndex: 999999 // 🔥 important for modal issue
};

// Wrapper functions
const Toastr = {
    success: (msg, title = "Success") => {
        toastr.success(msg, title);
    },
    error: (msg, title = "Error") => {
        toastr.error(msg, title);
    },
    warning: (msg, title = "Warning") => {
        toastr.warning(msg, title);
    },
    info: (msg, title = "Info") => {
        toastr.info(msg, title);
    }
};

export default Toastr;