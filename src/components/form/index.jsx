"use strict";
import React,{useState} from "react";
import "./form.scss";

function Form(props) {
  const [url, setUrl] = useState("");
    function handaleUrlChange(e) {
      setUrl(e.target.value);
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: "GET",
      url: url,
    };
    props.handleApiCall(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="url-span">URL: </span>
          <input name="url" type="text" 
          value={url}
          onChange={handaleUrlChange}/>
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span id="get">GET</span>
          <span id="post">POST</span>
          <span id="put">PUT</span>
          <span id="delete">DELETE</span>
        </label>
      </form>
    </>
  );
}

export default Form;
