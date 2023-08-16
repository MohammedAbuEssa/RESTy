"use strict";
import React from "react";
import ReactJson from 'react-json-view';

import "./results.scss";


function Results(props) {
  return (
    <section className="Results-section">
 {props.data !== null && (
        <ReactJson  src={props.data}  indentWidth={2} />
      )}    </section>
  );
}

export default Results;
