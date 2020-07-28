import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  IconButton,
  Box,
  Grid,
  Divider,
  Typography,
  InputAdornment
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import uniqid from "uniqid";
import { NavContext } from '../../../core/context/NavContext';
import paths from '../../../core/api/paths';
import { formatDate, formatAge } from '../../../utils/formatters';
import useApiRequest from '../../../core/hooks/useApiRequest';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button';
import Spinner from '../../Components/Spinner';

export default ({ history, location }) => {
  const [value, setValue] = useState('');
  const [filterValues, setFilterValues] = useState([]);
  const [seeAllResults, setSeeAllResults] = useState(false);
  const inputElement = useRef();
  const [query, setQuery] = useState('');
  const [{ response, loading, error }, { makeRequest }] = useApiRequest(
    `${paths.pateints}?_order=ASC&_sort=id&_start=0&q=${query}`,
    {
      verb: 'get'
    }
  );
  const { setHistory } = useContext(NavContext);

  useEffect(() => {
    setHistory(history);
  }, [history, setHistory]);

  useEffect(() => {
    makeRequest();
  }, [query, makeRequest]);

  useEffect(() => {
    setFilterValues(response ? response.data : []);
  }, [response]);

  const handleChange = searchValue => {
    setSeeAllResults(false);
    setValue(searchValue);
    setQuery(searchValue);
    makeRequest();
  };

  const clear = e => {
    setValue('');
    setQuery('');
  };

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  const label = location?.state === 'byPatient' ? 'Search Name / NHS Number' : 'Search Tasks';
  const searchResult = seeAllResults ? filterValues : filterValues.slice(0, 3);

  return (
    <Box >
      <Input
        label={label}
        autoFocus
        margin="normal"
        variant="outlined"
        fullWidth
        value={value}
        inputRef={inputElement}
        onChange={event => handleChange(event.target.value)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(value.length > 0 ? {
          endAdornment: <InputAdornment position="end">
            <IconButton onClick={clear}>
              <HighlightOffIcon />
            </IconButton>
          </InputAdornment>
        } : {})}

      />
      {value.length > 0 ?
        searchResult.map(option => {
          const { id, names, nhsNo, dob } = option;
          return (
            <Box ml={2} mr={2} p={1} key={uniqid()}>
              <Grid
                container
                direction="column"
                onClick={e => history.push(`/profile/${id}`)}
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
        }) : null
      }
      {
        !seeAllResults && filterValues.length > 3 && value.length > 0 && (
          <Box ml={2}>
            <Grid container>
              <Button
                color="secondary"
                onMouseDown={e => {
                  e.preventDefault();
                  inputElement.current.blur();
                  makeRequest();
                  setSeeAllResults(true);
                }}
              >
                See all results
        </Button>
            </Grid>
          </Box>

        )
      }
    </Box >
  );
};
