import React, { useState } from "react";

const SelectDropdown = ({
    options,
    handleSelect,
    stateKey,
    variantKey,
    handleVariationChange
}) => {
    const [value, setValue] = useState("");
    return (
        <select
            value={value}
            onChange={e => {
                setValue(e.target.value);
                handleVariationChange(e.target.value);
            }}>
            {options.map((option, index) => (
                <option key={index} value={option.variation}>
                    {option.variation}
                </option>
            ))}
        </select>
    );
};

export default SelectDropdown;
