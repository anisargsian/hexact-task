import React from 'react';


const Search = (props) => (
    <div>
        <input
            type='text'
            placeholder="search keywords"
            onChange={props.changed} />
        <button onClick={props.clicked}>Search</button>
    </div>
);

export default Search;