import React from 'react';
import './Keyword.css';

const Keyword = ({ keyName, keyValue, style }) => (
    <div className="Keyword" style={style}>
        <h3>{keyName}</h3>
        <p>{keyValue}</p>
        <hr />
    </div>
);

export default Keyword;