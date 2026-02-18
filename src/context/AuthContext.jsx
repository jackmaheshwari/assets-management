import { useState } from "react";

import { AuthContext } from "./AuthContextDefinition";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading] = useState(false);

    const login = (email, password) => {
        // Mock authentication
        if (email === "admin@example.com" && password === "password") {
            const userData = { email, name: "Admin User", role: "admin" };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
