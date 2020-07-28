import React from 'react';
import { Label } from 'recharts';
const ScatterLabel = ({ x, y, width, textColor, index, value, valueLabels }) => {
  const fill = textColor && textColor[index];
  const labelX = x + width / 2;
  const labelY = y + 6;

  return (
    <g>
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
        fontWeight="bold"
        x={labelX}
        y={labelY}
        fill={fill}
      >
        {valueLabels ? valueLabels[index] : value}
      </text>
    </g>
  );
};
export default ScatterLabel;
