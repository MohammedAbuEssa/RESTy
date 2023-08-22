import React, { useReducer, useEffect } from 'react';
import './app.scss';
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from "./components/history";
import axios from 'axios';

const SET_DATA = 'SET_DATA';
const SET_REQUEST_PARAMS = 'SET_REQUEST_PARAMS';
const SET_LOADING = 'SET_LOADING';
const ADD_TO_HISTORY = 'ADD_TO_HISTORY';

const appReducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case ADD_TO_HISTORY:
      const updatedHistory = [...state.history, action.payload];
      return { ...state, history: updatedHistory };
    case SET_REQUEST_PARAMS:
      return { ...state, requestParams: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const initialState = {
    data: null,
    requestParams: {},
    loading: false,
    history: [],
  };
  const [state, dispatch] = useReducer(appReducer, initialState);

  const callApi = (requestParams) => {
    dispatch({ type: SET_LOADING, payload: true });
  
    axios.get(requestParams.url)
      .then(response => {
        dispatch({ type: SET_DATA, payload: response.data });
        dispatch({ type: ADD_TO_HISTORY, payload: {
          method: requestParams.method,
          url: requestParams.url,
          results: response.data
        } });
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => {
        dispatch({ type: SET_LOADING, payload: false });
      });
  
    dispatch({ type: SET_REQUEST_PARAMS, payload: requestParams });
  };
  

  useEffect(() => {
    console.log("Data is changing");
  }, [state.data, state.requestParams]);

  const selectHistory = (historyEntry) => {
    dispatch({ type: SET_REQUEST_PARAMS, payload: {
      method: historyEntry.method,
      url: historyEntry.url,
    } });
    dispatch({ type: SET_DATA, payload: historyEntry.results });
  };

  return (
    <>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <History history={state.history} onSelectHistory={selectHistory} />
      <Results data={state.data} />
      <Footer />

      
    </>
  );
};

export default App;
