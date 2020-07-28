import { useReducer, useCallback } from 'react';
import axios from 'axios';
import reducer, { initialState } from './reducer';
import { fetching, success, error } from './actionCreators';
// import axiosInstance from '../../api/authAxiosInstance';

const useApiRequest = (endpoint, { verb = 'get' }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const makeRequest = useCallback(async (params) => {
    dispatch(fetching());
    try {
      // const response = await axiosInstance[verb](endpoint, params);
      const response = await axios[verb](endpoint, { params });
      dispatch(success(response));
    } catch (e) {
      dispatch(error(e));
    }
  }, [endpoint, verb]);

  return [state, { makeRequest }];
};

export default useApiRequest;
