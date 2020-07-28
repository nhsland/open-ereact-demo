import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@material-ui/core';
import uniqid from 'uniqid';

const a11yProps = index => ({ id: `${index}` });

export default ({ tabs }) => {
  const [value, setValue] = useState(0);
  const handleChange = (e, activeTab) => setValue(activeTab);
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
        textColor="primary"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={uniqid()}
            label={tab.label}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabs.map(
        (tab, index) =>
          value === index ? (
            <Box key={uniqid()} p={3} >
              {tab.component}
            </Box>
          ) :
            <Box key={uniqid()} p={3} style={{ display: 'none' }}>
              {tab.component}
            </Box>
      )}
    </>
  );
};
