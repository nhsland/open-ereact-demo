import React, { createContext, useState, useCallback } from 'react';

export const PatientContext = createContext({});

const PatientProvider = ({ children }) => {
    const [patient, setPatient] = useState(null);

    const setPatientData = useCallback((data) => {
        setPatient(data);
    }, [setPatient]);

    return (
        <PatientContext.Provider value={{ patient, setPatientData }}>
            {children}
        </PatientContext.Provider>
    );
};
export default PatientProvider;
