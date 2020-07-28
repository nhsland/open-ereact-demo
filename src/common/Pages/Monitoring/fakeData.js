export default {
    "id": "form",
    "patientId": 1,
    "ab": {
        "respirationRate": {
            "value": "",
            "label": "Respiration Rate",
            "units": "Breaths per minute",
            "pickerData": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8"
            ],
            "defaultValue": ""
        },
        "oxygenSaturation": {
            "value": "",
            "label": "Oxygen Saturation",
            "units": "%",
            "pickerData": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8"
            ],
            "defaultValue": "",
            "scale": "2"
        },
        "supplementalO2": {
            "value": "yes",
            "label": "Supplemental o2",
            "options": [
                {
                    "id": "yes",
                    "name": "Yes"
                },
                {
                    "id": "no",
                    "name": "No"
                }
            ]
        },
        "device": {
            "value": "Tracheostomy Mask",
            "label": "Device",
            "units": "%",
            "options": [
                {
                    "id": "nasal_cannula",
                    "name": "Nasal Cannula"
                },
                {
                    "id": "simple_mask",
                    "name": "Simple Mask"
                },
                {
                    "id": "with_reservoi",
                    "name": "With Reservoi"
                },
                {
                    "id": "aerosol_neb",
                    "name": "Aerosol / Neb"
                },
                {
                    "id": "venturi_mask",
                    "name": "Venturi Mask"
                },
                {
                    "id": "humified_system",
                    "name": "Humified System"
                },
                {
                    "id": "tracheostomy_mask",
                    "name": "Tracheostomy Mask"
                }
            ]
        },
        "flowRate": {
            "value": "",
            "label": "Flow Rate",
            "units": "Litres per minute",
            "pickerData": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8"
            ],
            "defaultValue": ""
        }
    },
    "c": {
        "bloodPressure": {
            "value": "",
            "label": "Blood Pressure",
            "units": "Beats per minute",
            "pickerData": [
                [
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40",
                    "41"
                ],
                [
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9"
                ]
            ],
            "defaultValue": ""
        },
        "pulseRate": {
            "value": "",
            "label": "Pulse Rate",
            "units": "Beats per minute",
            "pickerData": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8"
            ],
            "defaultValue": ""
        }
    },
    "de": {
        "consciousness": {
            "value": "",
            "label": "Consciousness",
            "options": [
                {
                    "id": "alert",
                    "name": "alert"
                },
                {
                    "id": "voice",
                    "name": "voice"
                },
                {
                    "id": "confusion",
                    "name": "confusion"
                },
                {
                    "id": "pain",
                    "name": "pain"
                },
                {
                    "id": "unresponsive",
                    "name": "unresponsive"
                }
            ]
        },
        "temperature": {
            "value": "",
            "label": "temperature",
            "units": "&#8451;",
            "pickerData": [
                [
                    "35",
                    "36",
                    "37",
                    "38",
                    "39",
                    "40",
                    "41"
                ],
                [
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9"
                ]
            ],
            "defaultValue": ""
        }
    }
};
