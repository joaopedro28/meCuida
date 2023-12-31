import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const setGlobalUserId = (id) => {
        setUserId(id);
    };

    const clearGlobalUserId = () => {
        setUserId(null);
    };
    return (
        <UserContext.Provider value={{ userId, setGlobalUserId, clearGlobalUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
