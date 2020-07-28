const calculateLineBreakpoints = data => {
  const indexes: number[] = [];
  data.forEach((record, index) => {
    const i = index === 0 ? index : index - 1;
    if (record.sats.scale !== data[i].sats.scale) {
      indexes.push(index);
    }
  });
  return indexes;
};

const createOneLineParametrItem = (x, value, score, range) => {
  const { min, max } = range;
  const item = { x, score, valueLabel: value };
  if (value < min || value > max) {
    return { ...item, y: value < min ? min : max };
  }
  return { ...item, y: value };
};

export const oneLineParameter = (data, key, range) => {
  const items: {}[] = [];
  data.forEach((record, index) => {
    const { value, score } = record[key];
    const x = index + 1;
    items.push(createOneLineParametrItem(x, value, score, range));
  });
  return items;
};

export const bloodPressureParametr = (data, range) => {
  const items: {
    systolic: {
      x: any;
      y: any;
      valueLabel: any;
      score: any;
    };
    disatolic: {
      x: any;
      y: any;
      valueLabel: any;
      score: any;
    };
  }[] = [];
  data.forEach((record, index) => {
    const { value: valueSystolic, score: scoreSysttolic } = record.systolicBP;
    const { value: valueDiastolic, score: scoreDiastolic } = record.diastolicBP;

    const x = index + 1;
    items.push({
      systolic: createOneLineParametrItem(
        x,
        valueSystolic,
        scoreSysttolic,
        range,
      ),
      disatolic: createOneLineParametrItem(
        x,
        valueDiastolic,
        scoreDiastolic,
        range,
      ),
    });
  });
  return items;
};

const createSaturationRateItem = (x, value, score, scale, o2, range) => {
  const { min, max } = range;
  const item = { x, score, scale, o2, valueLabel: value };
  if (value < min || value > max) {
    return { ...item, y: value < min ? min : max };
  }
  return { ...item, y: value };
};

export const saturationRateParametr = data => {
  const saturationRateItems: {}[] = [];
  const saturationRateLines: {}[] = [];
  const lineBreakpoints = calculateLineBreakpoints(data);

  data.forEach((record, index) => {
    const { value, score, scale, o2 } = record.sats;
    saturationRateItems.push(
      createSaturationRateItem(index + 1, value, score, scale, o2, {
        min: 75,
        max: 105,
      }),
    );
  });
  // slice records list in breakopints where the scale is changed
  lineBreakpoints.forEach((breakpoint, index) => {
    const firstItem = lineBreakpoints[index - 1] || 0;
    saturationRateLines.push(saturationRateItems.slice(firstItem, breakpoint));
  });
  // records after last breakpoint
  const [lastItem] = lineBreakpoints.slice(-1);
  saturationRateLines.push(saturationRateItems.slice(lastItem));

  return saturationRateLines;
};

export const xAxisTicks = data => data.map(({ name }) => name);

export const scatterLabelsContrastColors = (
  records: any,
  noScorring?: boolean,
) =>
  records.map(({ score, valueLabel, y }) =>
    noScorring
      ? valueLabel !== y
        ? '#fff'
        : '#4d4d4d'
      : score === 3
      ? '#fff'
      : '#4d4d4d',
  );

export const outOfRange = records =>
  records.map(({ valueLabel }) => valueLabel);
