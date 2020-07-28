import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import Text from '../Text';
import Button from '../Button';
import { capitalize, howManyDays } from '../../../utils/formatters';


export default ({
    record,
    expandable
}) => {
    const [expand, setExpand] = useState(false);
    const handeClick = () => setExpand(!expand);

    const { device, admitted, exceptedDidcharge, gender, consultant, dueTime, dob, height, bmi, weight, newsFreq, location = {} } = record;
    const { bed, ward } = location;
    const formatedGender = capitalize(gender);
    return (
        <>
            <Grid container direction="row" justify="space-between" spacing={2}>
                <Grid item>
                    <Text type='dob' label="DOB">{dob}</Text>
                    <Text label="Location">{`Bed ${bed}, Ward ${ward}`}</Text>
                    {admitted && (
                        <Text type='date' days label="Admitted">{admitted}</Text>
                    )}

                    {expand && (
                        <>
                            <Box mt={1}>
                                <Text label="Height" >{height}</Text>
                                <Text label="BMI">{bmi}</Text>
                            </Box>
                        </>
                    )}
                </Grid>
                <Grid item>
                    <Box pr={8}>
                        {gender && (
                            <Text label="Gender">{capitalize(formatedGender)}</Text>
                        )}
                        {consultant && (
                            <Text label="Consultant">{consultant}</Text>
                        )}

                        {dueTime && <Text label="NEWS Freq">{newsFreq}</Text>}
                        {dueTime && <Text label="Due Time">{dueTime}</Text>}
                        {exceptedDidcharge && (
                            <Text type='date' label="Ex. Discharge">{exceptedDidcharge}</Text>
                        )}
                        {expand && (
                            <Box mt={1}>
                                <Text label="Weight">{weight}</Text>
                            </Box>
                        )}
                    </Box>
                </Grid>
                {expand && device?.value && (
                    <Grid item>
                        <Box>
                            <Text label={`Supplemental O\u2082 Device`}>
                                {device.value}
                            </Text>
                        </Box>
                    </Grid>
                )}
            </Grid>

            <Grid item xs={12}>
                <Grid container direction="row" justify="flex-end" spacing={2}>
                    {expandable && (
                        <Button color="secondary" onClick={handeClick}>
                            {expand ? 'See Less' : 'See more'}
                        </Button>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
