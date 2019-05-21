import React from "react";

const SelectDropdown = ({ options, handleSelect, stateKey, variantKey }) => {
    return (
        <select onChange={e => handleSelect(variantKey, e.target.value)}>
            {options.map((option, index) => (
                <option key={index} value={option.variation}>
                    {option.variation}
                </option>
            ))}
        </select>
    );
};

export default SelectDropdown;
