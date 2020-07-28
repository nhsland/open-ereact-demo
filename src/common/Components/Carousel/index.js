import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import CropFreeIcon from '@material-ui/icons/CropFree';

const Item = ({ title, content, handleExpand }) => {
  return (
    <Grid container direction='row' alignItems='center' justify='flex-end'>
      <Grid item sm={11}>
        <Typography style={{ paddingLeft: '50px' }} align='center'>
          {title}
        </Typography>
      </Grid>
      <Grid item sm={1} style={{ position: 'relative', marginBottom: '50px' }}>
        <IconButton style={{ zIndex: '300' }} onClick={handleExpand}>
          <CropFreeIcon />
        </IconButton>
      </Grid>
      <Grid item sm={12}>
        <Box mt={2}>
          {content}
        </Box>
      </Grid>
    </Grid>
  );
};
const CustomeCarousel = ({ items, handleExpand, ...props }) => (

  <Carousel {...props}>
    {items && items.map(({ content, title }) => <Item content={content} title={title} handleExpand={handleExpand} />)}
  </Carousel>

);
export default CustomeCarousel;
