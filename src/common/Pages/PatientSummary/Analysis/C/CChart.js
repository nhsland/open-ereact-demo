/**
 * Copy of combained chart Saturation Rate with Heart Rate
 */

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
  oneLineParameter,
  xAxisTicks,
  scatterLabelsContrastColors,
} from '../../../../Components/Chart/chartFormatters';
import { data } from '../CChartFakeData';
import { yHeartRate, cChartdItems } from '../chartsConstants';
import { fullLine, shortLine } from '../ticks';

export default function CChart() {
  const [xTicks, setXTicks] = useState([]);
  const [heartRate, setHeartRate] = useState([]);

  const [bloodPressure, setBloodPressure] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setHeartRate(oneLineParameter(data, 'heartRate', { min: 20, max: 240 }));
      setBloodPressure(bloodPressureParametr(data, { min: 20, max: 240 }));
      setXTicks(xAxisTicks(data));
    }
  }, []);

  const longerTimeline = data.length > 12;
  const xTimeline = () => (longerTimeline ? fullLine : shortLine);

  return (
    <ResponsiveContainer height={600} width="99%">
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
          ticks={yHeartRate}
          interval={0}
          domain={['dataMin', 'dataMax']}
        />
        <CartesianGrid fill="#fff" vertical={false} />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ top: 65 }}
          content={<CustomizedLegend items={cChartdItems} />}
        />
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
        <ReferenceLine y={230}>
          <Label
            id="sats"
            fill="#4d4d4d"
            style={{ fontSize: '16px' }}
            value="Heart Rate and Blood Pressure"
            offset={80}
            position="top"
          />
        </ReferenceLine>
        Heart Rate and Blood Pressure
      </ScatterChart>
    </ResponsiveContainer>
  );
}
