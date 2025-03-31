// contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Add a loading state

    const checkAuth = () => {
        const token = Cookies.get("token");
        setIsAuthenticated(!!token);
        setLoading(false); // Set loading to false once we've checked
        return !!token; // Return the authentication status
    };

    const setAuthState = (status) => {
        setIsAuthenticated(status);
    };

    useEffect(() => {
        checkAuth();
    }, []); 

    const value = {
        isAuthenticated,
        loading,
        checkAuth,
        setAuthState,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };