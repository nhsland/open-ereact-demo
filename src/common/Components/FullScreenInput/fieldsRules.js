export const validationRules = name => ({
    'respirationRate.value': {
        rules: {
            min: 1,
            max: 59
        },
        errorObject: {
            singleInput: {
                type: 'range',
                message: 'Respiration Rate should be between 1- 59'
            }
        }
    },
    'oxygenSaturation.value': {
        rules: {
            min: 51,
            max: 100
        },
        errorObject: {
            singleInput: {
                type: 'range',
                message: 'Oxygen Saturation should be between 51- 100'
            }
        }
    },
    'flowRate.value': {
        rules: {
            min: 1,
            max: 12
        },
        errorObject: {
            singleInput: {
                type: 'range',
                message: 'Pulse Rate should be between 1- 12'
            }
        }
    },
    'pulseRate.value': {
        rules: {
            min: 1,
            max: 250
        },
        errorObject: {
            singleInput: {
                type: 'range',
                message: 'Pulse Rate should be between 1- 59'
            }
        }
    },
    'temperature.value': {
        rules: {
            min: 27.1,
            max: 49.9
        },
        errorObject: {
            singleInput: {
                type: 'range',
                message: 'Temperature should be between 27.1- 44.9'
            }
        }
    }
}[name]);

export const validationRulesBloodPresure = ({
    'systolic': {
        rules: {
            min: 1,
            max: 300
        },
        errorObject: {
            singleInput: {
                type: 'range',
                message: 'Systolic pressure should be between 1- 300'
            }
        }
    },
    'diastolic': {
        rules: {
            min: 1,
            max: 280
        },
        errorObject: {
            singleInput: {
                type: 'range',
                message: 'Diastolic pressure should be between 1-280'
            }
        }
    },
    'bloodPressure': {
        errorObject: {
            singleInput: {
                type: 'insertion',
                message: 'Systolic pressure must be higher than diastolic pressure'
            }
        }
    }
});