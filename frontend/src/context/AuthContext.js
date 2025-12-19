import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    function logout() {
    setUser(null);
    localStorage.removeItem("user");
}


    return (
        <AuthContext.Provider value={{ user, setUser,logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider