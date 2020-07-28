import React, { useState, useEffect, useContext, useRef } from 'react';
import {
    Box,
    Grid,
    Divider,
    Typography,
} from '@material-ui/core';
import uniqid from "uniqid";
import QrReader from 'react-qr-reader';
import Button from '../../Components/Button';
import { NavContext } from '../../../core/context/NavContext';
import paths from '../../../core/api/paths';
import { formatDate, formatAge } from '../../../utils/formatters';
import useApiRequest from '../../../core/hooks/useApiRequest';

export default ({ history }) => {
    const [result, setResult] = useState(null);
    const [scannerError, setScannerError] = useState(null);
    const [legacyMode, setLegacyMode] = useState(false);
    const [{ response, error }, { makeRequest }] = useApiRequest(
        `${paths.pateints}?_order=ASC&_sort=id&_start=0&q=${result}`,
        {
            verb: 'get'
        }
    );
    const { setHistory } = useContext(NavContext);
    const scannerElement = useRef(null);
    useEffect(() => {
        setHistory(history);
    }, [history, setHistory]);

    useEffect(() => {
        if (result) {
            makeRequest();
        }
    }, [result, makeRequest]);

    if (error) {
        return <p>{error}</p>;
    }

    const handleScan = data => {
        if (data) {
            setResult(data);
        }
    };
    const handleError = er => {
        if (er && !legacyMode) {
            setLegacyMode(true);
        }
        else if (er) {
            setScannerError(er);
        }
    };

    const openImageDialog = () => scannerElement.current.openImageDialog();
    return (
        <Box justifyContent='center'>
            {response && response.data ? (
                <>
                    {response.data.length === 0 && <Typography variant="subtitle1">No result</Typography>}
                    {response.data.map(option => {
                        const { id, names, nhsNo, dob } = option;
                        return (
                            <Box ml={2} mr={2} p={1} key={uniqid()}>
                                <Grid
                                    container
                                    direction="column"
                                    onClick={() => history.push(`/profile/${id}`)}
                                    key={uniqid()}
                                >
                                    <Grid item>
                                        <Typography variant="subtitle1">{names}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">{nhsNo}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">{formatDate(dob)} {formatAge(dob)}</Typography>
                                    </Grid>
                                    <Divider orientation="horizontal" />
                                </Grid>
                            </Box>
                        );
                    })}
                </>
            ) : (
                    <Box m={2} justifyContent='center' display='flex' flexWrap='wrap' >
                        {legacyMode &&
                            <Box m={1} p={1}>
                                <Button color='success' variant='contained' onClick={openImageDialog}>Scan QR Code</Button>
                            </Box>}
                        <QrReader
                            ref={scannerElement}
                            delay={300}
                            onScan={handleScan}
                            onError={handleError}
                            style={{ width: '80%' }}
                            legacyMode={legacyMode}
                            facingMode='environment'
                        />
                    </Box>
                )
            }
            <p>{scannerError}</p>
        </Box >
    );
};
