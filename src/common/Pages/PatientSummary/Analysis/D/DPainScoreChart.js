import React, { useEffect, useState } from 'react';
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Scatter,
  LabelList,
  ReferenceArea,
  Label,
  ReferenceLine,
  Legend,
  ResponsiveContainer,
  Line,
} from 'recharts';
import CustomizedYAxisTick from '../../../../Components/Chart/XAxisTick';
import CustomeShape from '../../../../Components/Chart/Scatter';
import ScatterLabel from '../../../../Components/Chart/ScatterLabel';
import CustomizedLegend from '../../../../Components/Chart/Legend';
// import { data } from '../fakeData';
import {
  saturationRateParametr,
  outOfRange,
  oneLineParameter,
  xAxisTicks,
  scatterLabelsContrastColors,
} from '../../../../Components/Chart/chartFormatters';
import { yTicksPainScore, dChartdItems } from '../chartsConstants';
import { fullLine, shortLine } from '../ticks';
const data = [
  { x: 1, both: false, valueLabel: 3, y: 3 },
  { x: 2, both: false, valueLabel: 4, y: 4 },
  { x: 3, both: false, valueLabel: 3, y: 3 },
  { x: 4, both: false, valueLabel: 3, y: 3 },
  { x: 5, both: false, valueLabel: 4, y: 4 },
  { x: 6, both: true, valueLabel: 3, y: 3 },
  { x: 7, both: false, valueLabel: 2, y: 2 },
  { x: 8, both: true, valueLabel: 1, y: 1 },
  { x: 9, score: 3, both: false, valueLabel: 5, y: 5 },
  { x: 10, both: false, valueLabel: 1, y: 1 },
  { x: 11, both: true, valueLabel: 3, y: 3 },
];

const dataMoving = [
  // { x: 1},
  // { x: 2},
  // { x: 3},
  // { x: 4},
  // { x: 5},
  { x: 6, both: true, valueLabel: 3, y: 3 },
  { x: 7, score: 3, both: false, valueLabel: 6, y: 6 },
  { x: 8, both: true, valueLabel: 1, y: 1 },
  { x: 9, score: 3, both: false, valueLabel: 9, y: 9 },
  { x: 10, score: 3, both: false, valueLabel: 5, y: 5 },
  { x: 11, both: true, valueLabel: 3, y: 3 },
];

export default function DPainScoreChart() {
  //   const [respirationRate, setRespirationRate] = useState<{}[]>([]);
  //   const [saturationRate, setSaturationRate] = useState<{}[]>([]);
  const [xTicks, setXTicks] = useState([]);
  const UNITS = { sats: '%', respirationRate: 'bpm' };
  const children = true;
  //   useEffect(() => {
  //     if (data.length > 0) {
  //       setRespirationRate(
  //         oneLineParameter(data, 'respirationRate', { min: 0, max: 60 }),
  //       );
  //       setSaturationRate(saturationRateParametr(data));
  //       setXTicks(xAxisTicks(data));
  //     }
  //   }, []);
  // console.log(JSON.stringify(saturationRate)

  const longerTimeline = data.length > 12;
  const xTimeline = () => (longerTimeline ? fullLine : shortLine);
  return (
    <ResponsiveContainer height={336} width="99%">
      <ScatterChart margin={{ right: 15, left: -30, top: 60, bottom: 50 }}>
        <XAxis
          dataKey="x"
          scale="time"
          type="number"
          name="Day"
          ticks={xTimeline()}
          interval={0}
          domain={['dataMin', 'dataMax']}
          tick={<CustomizedYAxisTick xTicks={xTicks} longerTimeline />}
          width={640}
          tickSize={12}
        />
        <YAxis
          dataKey="y"
          type="number"
          tick={{ fontSize: 12 }}
          ticks={yTicksPainScore}
          interval={0}
          domain={['dataMin', 'dataMax']}
        />
        <CartesianGrid fill="#fff" vertical={false} />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ top: 65 }}
          content={<CustomizedLegend items={dChartdItems} />}
        />
        <Scatter
          isAnimationActive={false}
          stroke="#000"
          shape={<CustomeShape painScore moving />}
          name="sats"
          line={
            <Line
              isAnimationActive={false}
              stroke="black"
              strokeDasharray="3 4 5 2"
            />
          }
          data={dataMoving}
          fill="#000"
        >
          <LabelList
            dataKey="y"
            content={
              <ScatterLabel
                textColor={scatterLabelsContrastColors(dataMoving)}
                valueLabels={outOfRange(dataMoving)}
              />
            }
          />
        </Scatter>
        <Scatter
          isAnimationActive={false}
          stroke="#000"
          shape={<CustomeShape painScore />}
          name="sats"
          line
          data={data}
          fill="#000"
        >
          <LabelList
            dataKey="y"
            content={
              <ScatterLabel
                textColor={scatterLabelsContrastColors(data)}
                valueLabels={outOfRange(data)}
              />
            }
          />
        </Scatter>
        );
        <ReferenceLine y={10}>
          <Label
            fill="#4d4d4d"
            style={{ fontSize: '16px' }}
            value="Pain Score"
            offset={60}
            position="top"
          />
        </ReferenceLine>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
