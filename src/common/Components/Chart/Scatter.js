import React from 'react';
import { Dot, Rectangle, Polygon } from 'recharts';
import { WarningIcon } from './WarnningIcon';

const CustomizedShape: React.FC<
  {
    large?: boolean;
    noScorring?: boolean;
    painScore?: boolean;
    moving?: boolean;
  } & (Polygon | Dot | Rectangle)
> = ({ cx, cy, payload, stroke, bp, large, noScorring, painScore, moving }) => {
  const { scale, o2, score, y, valueLabel, systolic, both } = payload;
  const fillColor = ['#fff', '#fbf184', '#FBC384', '#F40013'];
  const shapeName = () => {
    if (bp) {
      return systolic ? 'triangle' : 'triangleMirrow';
    }
    if (painScore) {
      if (moving) {
        return both ? 'hexagon' : 'triangle';
      }
      return both ? 'hexagon' : 'dot';
    }
    if (scale === 1) {
      if (o2) {
        return 'square';
      }
      return 'dot';
    }
    if (scale === 2) {
      if (o2) {
        return 'hexagon';
      }
      return 'daimond';
    }
    return 'dot';
  };

  const fill = noScorring
    ? y !== valueLabel
      ? fillColor[3]
      : fillColor[0]
    : fillColor[score]
    ? fillColor[score]
    : '#fff';

  return (
    <g>
      {
        {
          dot: (
            <Dot
              cx={cx}
              cy={cy}
              r={large ? 12 : 10}
              fill={fill}
              stroke={stroke}
            />
          ),
          square: (
            <Rectangle
              x={cx - 10}
              y={cy - 10}
              width={20}
              height={20}
              fill={fill}
              stroke={stroke}
            />
          ),
          daimond: (
            <Polygon
              points={[
                { x: cx - 12, y: cy },
                { x: cx, y: cy - 12 },
                { x: cx + 12, y: cy },
                { x: cx, y: cy + 12 },
              ]}
              fill={fill}
              stroke={stroke}
            />
          ),
          hexagon: (
            <Polygon
              points={[
                { x: cx - 10, y: cy + 6 },
                { x: cx - 10, y: cy - 6 },
                { x: cx, y: cy - 12 },
                { x: cx + 10, y: cy - 6 },
                { x: cx + 10, y: cy + 6 },
                { x: cx, y: cy + 12 },
              ]}
              fill={fill}
              stroke={stroke}
            />
          ),
          triangle: (
            <Polygon
              points={[
                { x: cx - 14, y: cy + 8 },
                { x: cx, y: cy - 16 },
                { x: cx + 14, y: cy + 8 },
              ]}
              fill={fill}
              stroke={stroke}
            />
          ),
          triangleMirrow: (
            <Polygon
              points={[
                { x: cx - 14, y: cy - 8 },
                { x: cx + 14, y: cy - 8 },
                { x: cx, y: cy + 14 },
              ]}
              fill={fill}
              stroke={stroke}
            />
          ),
        }[shapeName()]
      }
      {y !== valueLabel && <WarningIcon cx={cx} cy={cy} />}
    </g>
  );
};

export default CustomizedShape;
