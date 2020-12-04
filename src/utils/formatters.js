const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const formatTime = value => {
  const date = new Date(value);
  const houre = date.getHours();
  const minuts = date.getMinutes();
  return `${houre}:${minuts}`;
};

export const formatDate = value => {
  const date = new Date(value);
  const year = date
    .getFullYear()
    .toString()
    .slice(-2);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day}-${month}-${year}`;
};

export const formatAge = dob => {
  const date = new Date(dob);
  const diffMs = Date.now() - date.getTime();
  const ageDt = new Date(diffMs);

  return `(${Math.abs(ageDt.getUTCFullYear() - 1970)} yrs)`;
};

export const capitalize = str => {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return null;
};

export const howManyDays = (start, end) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : Date.now();
  return Math.round(Math.abs((startDate - endDate) / (oneDay)));
}; 
