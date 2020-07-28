import React, { useEffect, useState, useContext } from 'react';
import {
    Box,
    InputAdornment,
    IconButton
} from '@material-ui/core';
import uniqid from 'uniqid';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { NavContext } from '../../../core/context/NavContext';
import PatientRecord from '../../Components/PatientRecord';
import useApiRequest from '../../../core/hooks/useApiRequest';
import paths from '../../../core/api/paths';
import Card from '../../Components/Card';
import SortPoper from '../../Components/SortPoper';
import Input from '../../Components/Input/Input';
import NewCareEvent from '../../Components/Dialog/NewEventCare';
import Spinner from '../../Components/Spinner';
import BarCode from '../../../resources/img/BarCode.png';

const SORT_OPTIONS_PATIENTS = [
    {
        id: 'score.ammount',
        name: 'Early Warning Score'
    },
    {
        id: 'newsFreq',
        name: 'Observation Frequency'
    },
    {
        id: 'names',
        name: 'Patient name'
    }
];

export default ({ history }) => {
    const [openPoper, setOpenPoper] = useState(false);
    const [sort, setSort] = useState({ value: "score.ammount" });
    const [order, setOrder] = useState('DESC');
    const { setHistory } = useContext(NavContext);
    const [{ response, loading, error }, { makeRequest }] = useApiRequest(
        `${paths.pateints}?_order=${order}&_sort=${sort.value}&_start=0`,
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
    }, [history, setHistory]);

    const handleRedirect = (path) => {
        history.push(path);
    };
    const handleRedirectProfileSummary = (e, id) => {
        history.push(`/profile/${id}`);
    };
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
                            label='Search Name / NHS Number'
                            variant="outlined"
                            defaultWidth='100%'
                            inputProps={{ onClick: () => history.push('/search', 'byPatient') }}
                            // eslint-disable-next-line react/jsx-no-duplicate-props
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => history.push('/search-qr')}
                                        >
                                            <img height={45} src={BarCode} alt='bar code button' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    <Box >
                        <SortPoper
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
                    const { names, id, nhsNo, score } = item;
                    const key = uniqid();
                    return (
                        <Box m={1} key={key}>
                            <Card
                                handleClick={e => handleRedirectProfileSummary(e, id)}
                                title={names}
                                subheader={nhsNo}
                                score={score}
                                patientId={id}
                                onRedirect={handleRedirect}
                                action
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
