import { useState, useEffect } from "react";

import { AuthContext } from "./AuthContextDefinition";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    const response = await fetch(`${import.meta.env.VITE_API_ORIGIN}/verify`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: parsedUser.email }),
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                        localStorage.setItem("user", JSON.stringify(userData));
                    } else {
                        // User not found or server error
                        setUser(null);
                        localStorage.removeItem("user");
                    }
                } catch (error) {
                    console.error("Verification failed:", error);
                    // If server is down, we also clear the session to prevent auto-login
                    setUser(null);
                    localStorage.removeItem("user");
                }
            }
            setLoading(false);
        };

        verifyUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ORIGIN}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                return false;
            }

            const userData = await response.json();
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
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
