import React, { useEffect, useState, useContext } from 'react';
import {
    Box
} from '@material-ui/core';
import uniqid from 'uniqid';
import { NavContext } from '../../../core/context/NavContext';
import PatientRecord from '../../Components/PatientRecord';
import useApiRequest from '../../../core/hooks/useApiRequest';
import paths from '../../../core/api/paths';
import Card from '../../Components/Card';
import SortPoper from '../../Components/SortPoper';
import Input from '../../Components/Input/Input';
import Spinner from '../../Components/Spinner';

const SORT_OPTIONS_PATIENTS = [
    {
        id: 'priority',
        name: 'Priority'
    },
    {
        id: 'newsFreq',
        name: 'Observation Frequency'
    },
    {
        id: 'observationName',
        name: 'Observation Name'
    }
];

export default ({ history }) => {
    const [openPoper, setOpenPoper] = useState(false);
    const [sort, setSort] = useState({ value: "priority" });
    const [order, setOrder] = useState('ASC');

    const { setHistory } = useContext(NavContext);
    const [{ response, loading, error }, { makeRequest }] = useApiRequest(
        `${paths.tasks}?_order=${order}&_sort=${sort.value}&_start=0`,
        {
            verb: 'get'
        }
    );

    const shouldMakeRequest = sort || order;
    useEffect(() => {
        makeRequest();
    }, [shouldMakeRequest, makeRequest]);

    useEffect(() => {
        setHistory(history);
    }, [setHistory, history]);

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (

        <>
            <div style={{ width: '100%' }}>
                <Box
                    display="flex"
                    flexWrap="nowrap"
                    alignItems="center"
                    p={1}
                >
                    <Box width={3 / 4}>
                        <Input
                            label='Search Tasks'
                            variant="outlined"
                            defaultWidth='100%'
                            disabled
                        // onClick={() => history.push('/search')}
                        />
                    </Box>
                    <Box >
                        <SortPoper
                            disabled
                            open={openPoper}
                            setOpen={() => setOpenPoper(!openPoper)}
                            handleSort={val => {
                                setOrder(val.value === 'score.ammount' ? 'DESC' : 'ASC');
                                setSort(val);
                            }}
                            name="sortBy"
                            defaultValue={sort.value}
                            options={SORT_OPTIONS_PATIENTS}
                        />
                    </Box>

                </Box>
            </div>
            <Box m={1} mb={8}>
                {response.data.map(item => {
                    const { names, nhsNo, observationName } = item;
                    const key = uniqid();
                    return (
                        <Box m={1} key={key}>
                            <Card
                                taskName={observationName}
                                title={names}
                                subheader={nhsNo}
                                content={<PatientRecord record={item} />
                                }
                            />
                        </Box>
                    );
                }
                )}
            </Box>
        </>
    );
};
