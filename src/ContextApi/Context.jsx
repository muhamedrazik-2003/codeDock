import React, { useState, createContext } from 'react'

export const dataRefreshContext = createContext();
export const authContext = createContext();


function Context({ children }) {
    const [dataRefresh, setDataRefresh] = useState("")
    const [authStatus, setAuthStatus] = useState(true)

    return (
        <authContext.Provider value={{authStatus, setAuthStatus}}>
            <dataRefreshContext.Provider value={{ dataRefresh, setDataRefresh }}>
                {children}
            </dataRefreshContext.Provider>
        </authContext.Provider>
    )
};
export default Context;