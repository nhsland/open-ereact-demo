import React, { createContext, useState } from 'react';

export const SettingsContext = createContext({});

const SettingsProvider = ({ children }) => {

    const [settings, setSettings] = useState({
        picker: true,
        tabs: true
    });
    const setSettingsContext = (data) => {
        setSettings({ ...settings, ...data });
    };
    return (
        <SettingsContext.Provider value={{ settings, setSettingsContext }}>
            {children}
        </SettingsContext.Provider>
    );
};
export default SettingsProvider;
