import React, { createContext, useState, useMemo, useContext } from "react";

const CurrentActivityContext = createContext();

const useCurrentActivity = () => {
    const context = useContext(CurrentActivityContext);
    if (!context) {
        throw new Error(`useCurrentActivity must be used within a CurrentActivityProvider`)
    }
    return context;
}
const CurrentActivityProvider = props => {
    const [currentActivity, setCurrentActivity] = useState(null);
    const value = useMemo(() => [currentActivity, setCurrentActivity], [currentActivity]);
    return <CurrentActivityContext.Provider value={value} {...props} />
}

export {CurrentActivityProvider, useCurrentActivity};