import React from 'react';
import { Box } from '@material-ui/core';
import Tabs from '@bit/muicss.mui.tabs';
import Tab from '@bit/muicss.mui.tab';

import ABChart from './AB/ABChart';
import CSaturationRateChart from './C/CSaturationRateChart';
import CHeartRateChart from './C/CHeartRateChart';
import ABTable from './AB/ABTable';
import CTable from './C/CTable';
import EChart from './E/EChart';
import ETable from './E/ETable';
import DBloofGlucoseChart from './D/DBloofGlucoseChart';
import DPainScoreChart from './D/DPainScoreChart';
import DTable from './D/DTable';

const AnalysisContent = () => {
  const bloodGlucose = true;
  const painScore = false;

  return (
    <Box>
      <Tabs justified defaultSelectedIndex={0}>
        <Tab label="Vital Signs">
          <Box mt={4}>
            <Tabs
              className="mui-tabs__bar_blue"
              justified
              defaultSelectedIndex={0}
            >
              <Tab label="A + B">
                <Box width="100%">
                  <Box
                    width={1}
                    mt={1}
                    style={{ backgroundColor: 'lightgray' }}
                  >
                    <ABChart />
                  </Box>
                  <Box mt={4}>
                    <ABTable />
                  </Box>
                </Box>
              </Tab>

              <Tab label="C">
                <Box width="100%">
                  <Box
                    width={1}
                    mt={1}
                    style={{ backgroundColor: 'lightgray' }}
                  >
                    <CHeartRateChart />{' '}
                  </Box>
                  <Box
                    width={1}
                    mt={1}
                    style={{ backgroundColor: 'lightgray' }}
                  >
                    <CSaturationRateChart />
                  </Box>
                  <Box mt={4}>
                    <CTable />
                  </Box>
                </Box>
              </Tab>

              <Tab label="D">
                <Box width="100%">
                  {bloodGlucose && (
                    <Box
                      width={1}
                      mt={1}
                      style={{ backgroundColor: 'lightgray' }}
                    >
                      <DBloofGlucoseChart />
                    </Box>
                  )}
                  {true && (
                    <Box
                      width={1}
                      mt={1}
                      style={{ backgroundColor: 'lightgray' }}
                    >
                      <DPainScoreChart />
                    </Box>
                  )}
                  <Box mt={4}>
                    <DTable />
                  </Box>
                </Box>
              </Tab>

              <Tab label="E">
                <Box width="100%">
                  <Box
                    width={1}
                    mt={1}
                    style={{ backgroundColor: 'lightgray' }}
                  >
                    <EChart />
                  </Box>
                  <Box mt={4}>
                    <ETable />
                  </Box>
                </Box>
              </Tab>
            </Tabs>
          </Box>
        </Tab>
        <Tab label="Biochemistry" disabled />
        <Tab label="Haematology" disabled />
        <Tab label="Microbiology" disabled />
      </Tabs>
    </Box>
  );
};

export default AnalysisContent;
