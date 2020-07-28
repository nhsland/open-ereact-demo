const STEPS = {
    step1: {
        unwell: 'Patient ill / looks unwell / a concern?',
        impairedImmunity: 'Any impaired immunity (e.g. diabetes, steroids, chemotherapy)?',
        recentTrauma: 'Any evidence of recent trauma / surgery / invasive procedure',
        indwellingLines: 'Is there any indwelling lines / IVDU / broken skin?'
    }
};

export const parseFormData = (data, step) => {
    const parsed = { infectionSuspicion: [] };
    Object.keys(data).map(key => {
        if (data[key] === true || data[key] === 'yes') {
            parsed.infectionSuspicion.push(STEPS[step][key]);
        }
        return parsed;
    });
    return parsed;
};