import React, { useState } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices.map((p, i) => (
        <RadioGroup key={i} aria-label={p} name={p} value={value} onChange={handleChange}>
            <FormControlLabel value={`${p._id}`} control={<Radio />} label={p.name} />
        </RadioGroup>
    ));
};

export default RadioBox;
