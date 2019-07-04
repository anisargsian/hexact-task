import React from 'react';
import Keyword from '../Keyword/Keyword';

const Keywords = ({ keywords, style }) => (
    keywords.map(({ key, value }) => (
        <Keyword
            style={style}
            key={key}
            keyName={key}
            keyValue={value.length > 300 ? value.slice(0, 299).concat("...") : value}
        />
    ))
);

export default Keywords;