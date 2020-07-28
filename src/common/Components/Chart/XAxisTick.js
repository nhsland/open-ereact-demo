import React from 'react';
import { formatDate, formatTime } from '../../../utils/formatters';
import { XAxis } from 'recharts';

const CustomizedXAxisTick = ({ x, y, payload, xTicks, longerTimeline }) => {
  const value = payload?.value;
  const isEmptyValue = () => !value || value === 0 || value > xTicks.length;
  if (isEmptyValue()) {
    return <text />;
  }
  const date = value && xTicks ? xTicks[value - 1] : null;
  const fontSize = longerTimeline ? 10 : 12;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        transform="rotate(-90)"
        fontSize={fontSize}
        // marginBottom={0.5}
        x={2}
        y={-7}
        dy={4}
        textAnchor="end"
        fill="#666"
      >
        {formatDate(date)}
      </text>
      <text
        transform="rotate(-90)"
        fontSize={fontSize}
        // marginBottom={0.5}
        x={2}
        y={2}
        dy={6}
        textAnchor="end"
        fill="#666"
      >
        {formatTime(date)}
      </text>
    </g>
  );
};

export default CustomizedXAxisTick;
