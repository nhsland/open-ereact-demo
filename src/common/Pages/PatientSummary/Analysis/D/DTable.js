import React, { useEffect, useState } from 'react';

import { data } from './fakeData';
import { data as painScoreData } from './fakeDataPainScore';
import {
  getHeaders,
  getRows,
  getRecords,
} from '../../../../Components/ChartTable/tableFormatters';
import ChartTable from '../../../../Components/ChartTable';

export default function SimpleTable() {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  const formatTableData = tableData => {
    const bloodGlucoseValues = getRecords(getRows(tableData, 'bloodGlucose'));
    const consciousnessValues = getRecords(getRows(tableData, 'consciousness'));
    const painScoreMovingValues = getRecords(
      getRows(painScoreData, 'painScore', 'moving'),
    );
    const painScoreRestValues = getRecords(
      getRows(painScoreData, 'painScore', 'resting'),
    );
    const news2Values = getRecords(
      getRows(tableData, 'news2', undefined, { value: 'X' }),
    );

    return [
      { name: 'Blood Glucose (mM)', values: bloodGlucoseValues },
      { name: 'Consciousness', values: consciousnessValues },
      { name: 'Pain Score (Moving)', values: painScoreMovingValues },
      { name: 'Pain Score (Rest)', values: painScoreRestValues },
      { name: 'NEWS 2', values: news2Values, news2: true },
    ];
  };
  useEffect(() => {
    setHeaders(getHeaders(data));
    setRows(formatTableData(data));
  }, []);
  return <ChartTable rows={rows} headers={headers} />;
}
