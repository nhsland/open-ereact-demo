export const toTableHeader = length => {
  const diff = 12 - length;
  return [...Array(diff)].map(() => '');
};
export const toTableRecord = length => {
  const diff = 12 - length;
  return [...Array(diff)].map(() => ({ value: '', score: 0 }));
};

export const getColumns = tableData => {
  return tableData.map(record => record.name);
};

export const getHeaders = tableData => {
  const columnTitles = getColumns(tableData);
  const { length } = tableData;
  return length < 12
    ? columnTitles.concat(toTableHeader(length))
    : columnTitles;
};

const supplementalO2 = record => ({ value: record.sats.o2 ? 'Yes' : 'No' });

export const getRows = (
  tableData,
  key,
  subkey,
  val,
) => {
  const table = [];
  const item = record => {
    if (val) return val;
    if (key === 'supplementalO2') return supplementalO2(record);
    if (subkey) return record[key][subkey].value ? record[key][subkey] : { value: '-' };
    return record[key];
  };
  tableData.forEach(record => table.push(item(record)));
  return table;
};

export const getRecords = tableData => {
  const { length } = tableData;
  return length < 12 ? tableData.concat(toTableRecord(length)) : tableData;
};
