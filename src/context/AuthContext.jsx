import { useState, useEffect } from "react";

import { AuthContext } from "./AuthContextDefinition";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const storedUser = sessionStorage.getItem("user");
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
                        sessionStorage.setItem("user", JSON.stringify(userData));
                    } else if (response.status === 401 || response.status === 404) {
                        
                        setUser(null);
                        sessionStorage.removeItem("user");
                    }
                } catch (error) {
                    console.error("Verification failed:", error);
                    
                    
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
            sessionStorage.setItem("user", JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
