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
import { data } from './fakeData';
import {
  outOfRange,
  oneLineParameter,
  xAxisTicks,
  scatterLabelsContrastColors,
} from '../../../../Components/Chart/chartFormatters';
import { yTicksE } from '../chartsConstants';
import { fullLine, shortLine } from '../ticks';

export default function ABChart() {
  const [tempature, setTempature] = useState([]);
  const [xTicks, setXTicks] = useState([]);
  const UNITS = { temp: '\u2103' };
  useEffect(() => {
    if (data.length > 0) {
      setTempature(oneLineParameter(data, 'temp', { min: 33, max: 40 }));
      setXTicks(xAxisTicks(data));
    }
  }, []);

  const longerTimeline = data.length > 12;
  const xTimeline = () => (longerTimeline ? fullLine : shortLine);
  return (
    <ResponsiveContainer height={500} width="99%">
      <ScatterChart margin={{ right: 15, left: -30, top: 80, bottom: 60 }}>
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
          ticks={yTicksE}
          interval={0}
          domain={['dataMin', 'dataMax']}
        />
        <CartesianGrid fill="#fff" vertical={false} />
        <ReferenceLine y={40}>
          <Label
            style={{ fontSize: '16px' }}
            fill="#4d4d4d"
            value={`Temperature (${UNITS.temp})`}
            offset={30}
            position="insideBottom"
          />
        </ReferenceLine>

        <Scatter
          isAnimationActive={false}
          stroke="#000"
          shape={<CustomeShape large />}
          name="Respiration Rate"
          line
          data={tempature}
          fill="#000"
        >
          <LabelList
            dataKey="y"
            content={
              <ScatterLabel
                textColor={scatterLabelsContrastColors(tempature)}
              />
            }
            valueLabels={outOfRange(tempature)}
          />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
