import React, { useEffect, useState } from 'react';
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Scatter,
  LabelList,
  Label,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import CustomizedYAxisTick from '../../../../Components/Chart/XAxisTick';
import CustomeShape from '../../../../Components/Chart/Scatter';
import ScatterLabel from '../../../../Components/Chart/ScatterLabel';
import {
  outOfRange,
  oneLineParameter,
  xAxisTicks,
  scatterLabelsContrastColors,
} from '../../../../Components/Chart/chartFormatters';
import { data } from '../CChartFakeData';
import { yHeartRate } from '../chartsConstants';
import { fullLine, shortLine } from '../ticks';

export default function CChart() {
  const [xTicks, setXTicks] = useState([]);
  const [heartRate, setHeartRate] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setHeartRate(oneLineParameter(data, 'heartRate', { min: 40, max: 220 }));
      setXTicks(xAxisTicks(data));
    }
  }, []);

  const longerTimeline = data.length > 12;
  const xTimeline = () => (longerTimeline ? fullLine : shortLine);

  return (
    <ResponsiveContainer height={300} width="99%">
      <ScatterChart margin={{ right: 15, left: -30, top: 70, bottom: 50 }}>
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
          ticks={yHeartRate}
          interval={0}
          domain={['dataMin', 'dataMax']}
        />
        <CartesianGrid fill="#fff" vertical={false} />
        <Scatter
          isAnimationActive={false}
          stroke="#000"
          shape={<CustomeShape />}
          name="Heart Rate"
          line
          data={heartRate}
          fill="#000"
        >
          <LabelList
            dataKey="y"
            content={
              <ScatterLabel
                textColor={scatterLabelsContrastColors(heartRate)}
              />
            }
            valueLabels={outOfRange(heartRate)}
          />
        </Scatter>
        <ReferenceLine y={220}>
          <Label
            fill="#4d4d4d"
            style={{ fontSize: '16px' }}
            value="Heart Rate (bpm)"
            offset={30}
            position="top"
          />
        </ReferenceLine>
        {/* Heart Rate */}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
