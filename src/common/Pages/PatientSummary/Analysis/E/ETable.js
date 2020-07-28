import React, { useEffect, useState } from 'react';

import { data } from './fakeData';
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
    const tempatureValues = getRecords(getRows(tableData, 'temp'));
    const news2Values = getRecords(
      getRows(tableData, 'news2', undefined, { value: 'X' }),
    );

    return [
      { name: 'Temperature (\u2103)', values: tempatureValues },
      { name: 'NEWS 2', values: news2Values, news2: true },
    ];
  };

  useEffect(() => {
    setHeaders(getHeaders(data));
    setRows(formatTableData(data));
  }, []);
  return <ChartTable rows={rows} headers={headers} />;
}
