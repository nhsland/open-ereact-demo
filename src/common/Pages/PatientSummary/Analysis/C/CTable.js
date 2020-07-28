import React, { useEffect, useState } from 'react';
import { data } from '../CChartFakeData';
import ChartTable from '../../../../Components/ChartTable';
import {
  getHeaders,
  getRows,
  getRecords,
} from '../../../../Components/ChartTable/tableFormatters';

export default function SimpleTable() {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  const formatTableData = tableData => {
    const heartRateValues = getRecords(getRows(tableData, 'heartRate'));
    const systolicBPValues = getRecords(getRows(tableData, 'systolicBP'));
    const disatolicBPValues = getRecords(getRows(tableData, 'diastolicBP'));
    const news2Values = getRecords(getRows(tableData, 'news2', undefined, { value: 'X' }));

    return [
      { name: 'Heart Rate (bpm)', values: heartRateValues },
      { name: 'Systolic BP (mmHG)', values: systolicBPValues },
      { name: 'Diastolic BP (mmHG)', values: disatolicBPValues },
      { name: 'NEWS 2', values: news2Values, news2: true },
    ];
  };

  useEffect(() => {
    setHeaders(getHeaders(data));
    setRows(formatTableData(data));
  }, []);

  return <ChartTable rows={rows} headers={headers} />;
}
