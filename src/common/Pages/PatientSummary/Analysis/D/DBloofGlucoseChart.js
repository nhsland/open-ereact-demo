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
import { yTicksDBG } from '../chartsConstants';
import { fullLine, shortLine } from '../ticks';

export default function ABChart() {
  const [bloodGlucose, setBloodGlucose] = useState([]);
  const [xTicks, setXTicks] = useState([]);
  const UNITS = { bloodGlucose: 'mM' };
  useEffect(() => {
    if (data.length > 0) {
      setBloodGlucose(
        oneLineParameter(data, 'bloodGlucose', { min: 0, max: 8 }),
      );
      setXTicks(xAxisTicks(data));
    }
  }, []);

  const longerTimeline = data.length > 12;
  const xTimeline = () => (longerTimeline ? fullLine : shortLine);
  return (
    <ResponsiveContainer height={300} width="99%">
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
          ticks={yTicksDBG}
          interval={0}
          domain={['dataMin', 'dataMax']}
        />
        <CartesianGrid fill="#fff" vertical={false} />
        <ReferenceLine y={8}>
          <Label
            style={{ fontSize: '16px' }}
            fill="#4d4d4d"
            value={`Blood Glucose (${UNITS.bloodGlucose})`}
            offset={30}
            position="insideBottom"
          />
        </ReferenceLine>

        <Scatter
          isAnimationActive={false}
          stroke="#000"
          shape={<CustomeShape noScorring />}
          name="Respiration Rate"
          line
          data={bloodGlucose}
          fill="#000"
        >
          <LabelList
            dataKey="y"
            content={
              <ScatterLabel
                textColor={scatterLabelsContrastColors(bloodGlucose, true)}
              />
            }
            valueLabels={outOfRange(bloodGlucose)}
          />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
