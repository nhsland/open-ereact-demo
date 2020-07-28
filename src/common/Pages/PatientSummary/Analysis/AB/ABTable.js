import React, { useEffect, useState } from 'react';

import { data } from '../fakeData';
import {
  getHeaders,
  getRows,
  getRecords,
} from '../../../../Components/ChartTable/tableFormatters';
import ChartTable from '../../../../Components/ChartTable';

export default function SimpleTable() {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  // const ref = useRef();

  // useEffect(() => {
  //     const offset = l ? 1300 : 1200;
  //     ref.current.scrollLeft += offset;
  // }, []);

  const formatTableData = tableData => {
    const respirationRateValues = getRecords(
      getRows(tableData, 'respirationRate'),
    );
    const saturationRateValues = getRecords(getRows(tableData, 'sats'));
    const supplementalO2Values = getRecords(
      getRows(tableData, 'supplementalO2'),
    );
    const oxygenDeviceValues = getRecords(
      getRows(tableData, 'oxygenDevice', undefined, { value: 'X' }),
    );
    const flowRateValues = getRecords(
      getRows(tableData, 'flowRate', undefined, { value: 'X' }),
    );
    const news2Values = getRecords(
      getRows(tableData, 'news2', undefined, { value: 'X' }),
    );

    return [
      { name: 'Respiration Rate (bpm)', values: respirationRateValues },
      { name: 'Saturation Rate (%)', values: saturationRateValues },
      { name: 'Supplemental Oxygen', values: supplementalO2Values },
      { name: 'Oxygen Device', values: oxygenDeviceValues },
      { name: 'Fi O\u2082', values: flowRateValues },
      { name: 'NEWS 2', values: news2Values, news2: true },
    ];
  };

  useEffect(() => {
    setHeaders(getHeaders(data));
    setRows(formatTableData(data));
  }, []);
  return <ChartTable rows={rows} headers={headers} />;
}
