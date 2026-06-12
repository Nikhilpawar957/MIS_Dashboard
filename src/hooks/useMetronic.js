import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useMetronic() {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.KTMenu?.createInstances();
            window.KTDrawer?.createInstances();
            window.KTScroll?.createInstances();
            window.KTToggle?.createInstances();
            window.KTApp?.init();
        }, 200);
    }, [location.pathname]);
}