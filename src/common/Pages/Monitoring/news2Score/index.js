// temporary way for calculate news2 Score ==> 1 phase of tests
import fields from '../../../../resources/fileds';

const respirationRateMap = (score, value) =>
  ({
    3: value <= 8 || value >= 24,
    2: (value > 8 && value < 9) || (value >= 21 && value <= 24),
    1: (value >= 9 && value <= 11) || (value > 20 && value < 21),
    0: value >= 12 && value <= 20
  }[score]);

const bloodPressureMap = (score, value) =>
  ({
    3: value <= 90 || value >= 220,
    2: value >= 91 && value <= 100,
    1: value >= 101 && value <= 110,
    0: value >= 111 && value <= 219
  }[score]);

const pulseRateMap = (score, value) =>
  ({
    3: value <= 40 || value >= 131,
    2: value >= 111 && value <= 130,
    1: (value >= 41 && value <= 50) || (value >= 91 && value <= 110),
    0: value >= 51 && value <= 90
  }[score]);

const temperatureMap = (score, value) =>
  ({
    3: value <= 35.0 || value > 39.1,
    2: value >= 39.1,
    1: (value >= 35.1 && value <= 36.0) || (value >= 38.1 && value <= 39.0),
    0: value >= 36.1 && value <= 38.0
  }[score]);

const consciousnessMap = (score, value) =>
  ({
    3: ['voive', 'confusion', 'pain', 'unresponsive'].includes(value),
    2: false,
    1: false,
    0: value === 'alert'
  }[score]);

const supplementalO2Map = (score, value) =>
  ({
    3: false,
    2: value === 'yes',
    1: false,
    0: value === 'no'
  }[score]);

const oxygenSaturationScale1Map = (score, value) =>
  ({
    3: value <= 91,
    2: value >= 92 && value <= 93,
    1: value >= 94 && value <= 95,
    0: value >= 96
  }[score]);

const oxygenSaturationScale2OxygenMap = (score, value, oxygen) =>
  ({
    3: value <= 83 || value >= 97,
    2: (value >= 84 && value <= 85) || (value >= 95 && value <= 96),
    1: (value >= 86 && value <= 87) || (value >= 93 && value <= 94),
    0: value >= 88 && value <= 92
  }[score]);

const oxygenSaturationScale2AirMap = (score, value, oxygen) =>
  ({
    3: value <= 83,
    2: value >= 84 && value <= 85,
    1: value >= 86 && value <= 87,
    0: value >= 93
  }[score]);

const parametrRules = parametr =>
  ({
    respirationRate: respirationRateMap,
    bloodPressure: bloodPressureMap,
    pulseRate: pulseRateMap,
    temperature: temperatureMap,
    consciousness: consciousnessMap,
    supplementalO2: supplementalO2Map,
    oxygenSaturationScale1: oxygenSaturationScale1Map,
    oxygenSaturationScale2Oxygen: oxygenSaturationScale2OxygenMap,
    oxygenSaturationScale2OAir: oxygenSaturationScale2AirMap
  }[parametr]);

export const calculateScore = (parametr, value, scale) => {
  if (parametrRules(parametr, scale)(3, value)) return 3;
  if (parametrRules(parametr, scale)(2, value)) return 2;
  if (parametrRules(parametr, scale)(1, value)) return 1;
  if (parametrRules(parametr, scale)(0, value)) return 0;
  return 0;
};

export const calculateNews2Score = form => {
  const parttlyBloodPresure = form.bloodPressure.value.split('/');

  const respirationRate = calculateScore(
    'respirationRate',
    form.respirationRate.value
  );
  const oxygenSaturation = calculateScore(
    'oxygenSaturationScale1',
    form.oxygenSaturation.value
  );
  const supplementalO2 = calculateScore(
    'supplementalO2',
    'yes'
  );
  const bloodPressure = calculateScore(
    'bloodPressure',
    Number(`${parttlyBloodPresure[0]}.${parttlyBloodPresure[1]}`)
  );
  const pulseRate = calculateScore('pulseRate', form.pulseRate.value);
  const consciousness = calculateScore(
    'consciousness',
    form.consciousness.value
  );
  const temperature = calculateScore(
    'temperature',
    Number(form.temperature.value)
  );

  const total = {
    respirationRate,
    oxygenSaturation,
    supplementalO2,
    bloodPressure,
    pulseRate,
    consciousness,
    temperature
  };
  return total;
};

const getClinicalRisk = (value) => {
  if (value >= 7) return 'High';
  if (value < 0) return 'Low-medium';
  if (value >= 0 && value <= 4) return 'Low';
  if (value === 5 || value === 6) return 'Medium';
};

export const getSummaryData = (total, form) => {
  const { respirationRate, oxygenSaturation, bloodPressure, temperature, pulseRate, consciousness } = form;
  const allValues = Object.values(total);
  const isLowMedium = allValues.filter(val => val === 3).length === 1;
  const scoreSum = allValues.reduce((a, b) => a + b)
  const score = isLowMedium ? -Math.abs(scoreSum) : scoreSum
  return {
    score,
    clinicalRisk: getClinicalRisk(score),
    ab: [
      {
        value: respirationRate.value,
        name: 'respirationRate.value',
        section: 'A + B',
        label: 'Respiration Rate',
        units: 'bpm',
        score: {
          ammount: total.respirationRate,
          description: 'better'
        }
      },
      {
        value: oxygenSaturation.value,
        name: 'oxygenSaturation.value',
        label: 'Oxygen Saturation',
        units: fields.oxygenSaturation.units,
        section: 'A + B',
        score: {
          ammount: total.oxygenSaturation,
          description: 'same'
        }
      }
    ],
    c: [
      {
        value: bloodPressure.value,
        name: 'bloodPressure.value',
        label: 'Blood Pressure',
        units: fields.bloodPressure.units,
        section: 'C',
        score: {
          ammount: total.bloodPressure,
          description: 'same'
        }
      },
      {
        value: pulseRate.value,
        name: 'pulseRate.value',
        label: 'Pulse rate',
        units: 'bpm',
        section: 'C',
        score: {
          ammount: total.pulseRate,
          description: 'same'
        }
      }
    ],
    de: [
      {
        value: consciousness.value,
        name: 'consciousness.value',
        label: 'Consciousness',
        section: 'DE',
        score: {
          ammount: total.consciousness,
          description: 'same'
        }
      },
      {
        value: temperature.value,
        name: 'temperature.value',
        label: 'Temperature',
        units: fields.temperature.units,
        section: 'DE',
        score: {
          ammount: total.temperature,
          description: 'same'
        }
      }
    ]
  };
};
