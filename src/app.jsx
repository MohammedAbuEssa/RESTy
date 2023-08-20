import React , {useState,useEffect}from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});


  const callApi = (requestParams) => {
    axios.get(requestParams.url)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));

    setRequestParams(requestParams);
  };
  useEffect(() => {
    console.log("Data is changing");
}, [data,requestParams])
  
  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </>
  );
};

export default App;
