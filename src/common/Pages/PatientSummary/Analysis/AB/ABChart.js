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
} from 'recharts';
import CustomizedYAxisTick from '../../../../Components/Chart/XAxisTick';
import CustomeShape from '../../../../Components/Chart/Scatter';
import ScatterLabel from '../../../../Components/Chart/ScatterLabel';
import CustomizedLegend from '../../../../Components/Chart/Legend';
import { data } from '../fakeData';
import {
  saturationRateParametr,
  outOfRange,
  oneLineParameter,
  xAxisTicks,
  scatterLabelsContrastColors,
} from '../../../../Components/Chart/chartFormatters';
import {
  saturationRateLegendItems,
  yTicksAdultAB,
  yTicksChildrenAB,
} from '../chartsConstants';
import { fullLine, shortLine } from '../ticks';

export default function ABChart() {
  const [respirationRate, setRespirationRate] = useState([]);
  const [saturationRate, setSaturationRate] = useState([]);
  const [xTicks, setXTicks] = useState([]);
  const UNITS = { sats: '%', respirationRate: 'bpm' };
  const children = true;
  useEffect(() => {
    if (data.length > 0) {
      setRespirationRate(
        oneLineParameter(data, 'respirationRate', { min: 0, max: 60 }),
      );
      setSaturationRate(saturationRateParametr(data));
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
          ticks={children ? yTicksChildrenAB : yTicksAdultAB}
          interval={0}
          domain={['dataMin', 'dataMax']}
        />
        <CartesianGrid fill="#fff" vertical={false} />

        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ top: 65 }}
          content={<CustomizedLegend items={saturationRateLegendItems} />}
        />

        <ReferenceArea
          x1={0}
          x2={longerTimeline ? 24 : 13}
          y1={60}
          y2={75}
          fill="#D3D3D3"
          strokeOpacity={0.3}
        />
        <ReferenceLine y={60}>
          <Label
            style={{ fontSize: '16px' }}
            fill="#4d4d4d"
            value={`Respiration Rate (${UNITS.respirationRate})`}
            offset={13}
            position="insideBottom"
          />
        </ReferenceLine>
        <ReferenceLine y={105}>
          <Label
            id="sats"
            fill="#4d4d4d"
            style={{ fontSize: '16px' }}
            value={`Saturation Rate (${UNITS.sats})`}
            offset={60}
            position="top"
          />
        </ReferenceLine>

        <Scatter
          isAnimationActive={false}
          stroke="#000"
          shape={<CustomeShape />}
          name="Respiration Rate"
          line
          data={respirationRate}
          fill="#000"
        >
          <LabelList
            dataKey="y"
            content={
              <ScatterLabel
                textColor={scatterLabelsContrastColors(respirationRate)}
              />
            }
            valueLabels={outOfRange(respirationRate)}
          />
        </Scatter>

        {saturationRate.map(record => {
          return (
            <Scatter
              isAnimationActive={false}
              stroke="#000"
              shape={<CustomeShape />}
              name="sats"
              line
              data={record}
              fill="#000"
            >
              <LabelList
                dataKey="y"
                content={
                  <ScatterLabel
                    textColor={scatterLabelsContrastColors(record)}
                    valueLabels={outOfRange(record)}
                  />
                }
              />
            </Scatter>
          );
        })}
      </ScatterChart>
    </ResponsiveContainer>
  );
}
