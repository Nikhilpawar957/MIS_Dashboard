import { useEffect, useState, useCallback } from "react";
import { loginApi } from "../services";

const STORAGE_KEY = "mis:auth";
const EVENT = "mis:auth-change";

export const getStoredUser = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

export const loginUser = async (payload) => {

    const res = await loginApi(payload);

    const { token, refreshToken, user } = res.data;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    localStorage.setItem("authToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", user.role);
    window.dispatchEvent(new Event(EVENT));
};

export const logoutUser = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event(EVENT));
};

export const useAuth = () => {
    const [user, setUser] = useState(getStoredUser);

    useEffect(() => {
        const sync = () => setUser(getStoredUser());
        window.addEventListener(EVENT, sync);
        window.addEventListener("storage", sync);
        return () => {
            window.removeEventListener(EVENT, sync);
            window.removeEventListener("storage", sync);
        };
    }, []);

    const login = useCallback(async (u) => await loginUser(u), []);
    const logout = useCallback(() => logoutUser(), []);

    return { user, isAuthenticated: !!user, login, logout };
};