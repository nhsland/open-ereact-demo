import React, { useEffect, useState } from 'react';
import {
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Scatter,
  LabelList,
  Line,
  Label,
  ReferenceLine,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import CustomizedYAxisTick from '../../../../Components/Chart/XAxisTick';
import CustomeShape from '../../../../Components/Chart/Scatter';
import ScatterLabel from '../../../../Components/Chart/ScatterLabel';
import CustomizedLegend from '../../../../Components/Chart/Legend';
import {
  bloodPressureParametr,
  outOfRange,
  xAxisTicks,
  scatterLabelsContrastColors,
} from '../../../../Components/Chart/chartFormatters';
import { data } from '../CChartFakeData';
import { yBloodPressure, cChartdItems } from '../chartsConstants';
import { fullLine, shortLine } from '../ticks';
import uniqid from 'uniqid';

export default function CChart() {
  const [xTicks, setXTicks] = useState([]);

  const [bloodPressure, setBloodPressure] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setBloodPressure(bloodPressureParametr(data, { min: 60, max: 240 }));
      setXTicks(xAxisTicks(data));
    }
  }, []);

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
          ticks={yBloodPressure}
          interval={0}
          domain={['dataMin', 'dataMax']}
        />
        <CartesianGrid fill="#fff" vertical={false} />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ top: 60 }}
          content={<CustomizedLegend items={cChartdItems} />}
        />
        {bloodPressure.map(record => {
          const da = [
            {
              x: record.systolic.x,
              y: record.systolic.y,
              systolic: true,
              valueLabel: record.systolic.valueLabel,
              score: record.systolic.score,
            },
            {
              x: record.systolic.x,
              y: record.disatolic.y,
              systolic: false,
              valueLabel: record.disatolic.valueLabel,
              score: record.disatolic.score,
            },
          ];
          return (
            <Scatter
              key={uniqid()}
              isAnimationActive={false}
              stroke="#000"
              shape={<CustomeShape bp />}
              data={da}
              line={
                <Line
                  isAnimationActive={false}
                  stroke="black"
                  strokeDasharray="3 4 5 2"
                />
              }
            >
              <LabelList
                dataKey="y"
                content={
                  <ScatterLabel textColor={scatterLabelsContrastColors(da)} />
                }
                valueLabels={outOfRange(da)}
              />
            </Scatter>
          );
        })}
        <ReferenceLine y={240}>
          <Label
            fill="#4d4d4d"
            style={{ fontSize: '16px' }}
            value="Blood Pressure"
            offset={60}
            position="top"
          />
        </ReferenceLine>
        {/* Blood Pressure */}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
