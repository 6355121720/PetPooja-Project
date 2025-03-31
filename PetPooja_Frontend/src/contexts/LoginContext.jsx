import { createContext, useState } from "react";

export const LoginContext = createContext(); // Create context

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState("");

    return (
        <LoginContext.Provider value={{ user, setUser}}>
            {children}
        </LoginContext.Provider>
    );
};
