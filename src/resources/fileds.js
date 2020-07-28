const respirationRate = {
  name: "respirationRate.value",
  title: 'Add Respiration Rate',
  label: 'Respiration Rate',
  defaultValue: 12,
  placeholder: 'Respiration Rate',
  units: 'Breaths per minute',
  optionGroups: {
    firstColumn: [...Array(60).keys()].slice(1)
  },
  valueGroupsProps: {
    firstColumn: 12
  }
};

const oxygenSaturation = {
  name: 'oxygenSaturation.value',
  title: 'Add Oxygen Saturation - SpO\u2082',
  label: 'Oxygen Saturation',
  placeholder: 'Oxygen Saturation',
  units: '%',
  optionGroups: {
    firstColumn: [...Array(101).keys()].slice(51)
  },
  valueGroupsProps: {
    firstColumn: 96
  }
};

const oxygenSaturationScale2 = {
  name: 'oxygenSaturation.value',
  label: 'Oxygen Saturation',
  placeholder: 'Oxygen Saturation',
  title: 'Add Oxygen Saturation - SpO\u2082',
  units: '%',
  optionGroups: {
    firstColumn: [...Array(101).keys()].slice(51)
  },
  valueGroupsProps: {
    firstColumn: 86
  }
};

const supplementalO2 = {
  name: 'supplementalO2.value',
  label: 'Supplemental O\u2082',
  values: [
    {
      id: 'yes',
      value: 'Yes'
    },
    {
      id: 'no',
      value: 'No'
    }
  ]
};

const flowRate = {
  name: 'flowRate.value',
  label: 'Flow Rate',
  placeholder: 'Flow Rate',
  title: 'Add Flow Rate',
  units: ['Liters per minute', '%'],
  optionGroups: {
    firstColumn: [...Array(13).keys()]
  },
  valueGroupsProps: {
    firstColumn: 11
  }
};

const bloodPressure = {
  name: 'bloodPressure.value',
  label: 'Blood Pressure',
  placeholder: 'Blood Pressure',
  title: 'Add Blood Presure',
  units: 'mmHg',
  columnTitles: ['Systolic', 'Diastolic'],
  optionGroups: {
    firstColumn: [...Array(301).keys()].slice(1),
    separator: ['/'],
    secondColumn: [...Array(281).keys()].slice(1)
  },
  valueGroupsProps: {
    firstColumn: 160,
    separator: '/',
    secondColumn: 159
  }
};

const pulseRate = {
  name: 'pulseRate.value',
  label: 'Pulse Rate',
  placeholder: 'Pulse Rate',
  title: 'Add Pulse Rate',
  optionGroups: {
    firstColumn: [...Array(251).keys()].slice(1)
  },
  valueGroupsProps: {
    firstColumn: 60
  },
  units: 'Beats per minute',
};

const consciousness = {
  name: 'consciousness.value',
  label: 'Consciousness',
  values: [
    {
      id: 'alert',
      value: 'Alert'
    },
    {
      id: 'voice',
      value: 'Voice'
    },
    {
      id: 'confusion',
      value: 'Confusion'
    },
    {
      id: 'pain',
      value: 'Pain'
    },
    {
      id: 'unresponsive',
      value: 'Unresponsive'
    }
  ],
};

const temperature = {
  name: 'temperature.value',
  label: 'Temperature',
  title: 'Add Temperature',
  placeholder: 'Temperature',
  units: '\u2103',
  optionGroups: {
    firstColumn: [...Array(45).keys()].slice(27),
    separator: ['\u25CF'],
    secondColumn: [...Array(10).keys()]
  },
  valueGroupsProps: {
    firstColumn: 36,
    separator: '\u25CF',
    secondColumn: 6
  }
};

const HELP_DIALOG_ISB_SITUATUION_CONTENT = [
  'Why are you concerned?',
  'Is there any abnormal physiology?',
  'Hint 3'
];
const HELP_DIALOG_ISB_BACKGROUND_CONTENT = [
  'What history does the patient have?',
  'Has the patient been complaining of being unwell?',
  'Is the patient taking medication?',
  'What was the patient’s previous EWS score?'
];


const situation = {
  name: 'situation',
  placeholder: 'Enter Situation information e.g.',
  helpProp: {
    title: 'SITUATION INFORMATION',
    content: HELP_DIALOG_ISB_SITUATUION_CONTENT
  },
};

const background = {
  name: 'background',
  placeholder: 'Enter Background information',
  helpProp: {
    title: 'BACKGROUND INFORMATION',
    content: HELP_DIALOG_ISB_BACKGROUND_CONTENT
  }
};

export default {
  respirationRate,
  oxygenSaturation,
  oxygenSaturationScale2,
  supplementalO2,
  flowRate,
  bloodPressure,
  pulseRate,
  consciousness,
  temperature,
  situation,
  background
};
