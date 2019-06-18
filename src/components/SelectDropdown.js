import React, { useState, useEffect, useRef } from "react";

const SelectDropdown = ({
    options,
    selected,
    handleSelect,
    stateKey,
    variantKey,
    group,
    getDropdown,
    handleVariationChange
}) => {
    const [value, setValue] = useState(options[0].variation);
    useEffect(() => {
        getDropdown(value);
        if (group.id === selected.id) {
            // console.log("t");
            handleSelect(stateKey, group, variantKey, value);
        }
    }, [
        getDropdown,
        group.id,
        selected.id,
        handleVariationChange,
        value,
        group,
        handleSelect,
        stateKey,
        variantKey
    ]);
    const ref = useRef();
    return (
        <select
            ref={ref}
            value={value}
            onChange={e => {
                // console.log(e.target.value);
                // handleSelect(stateKey, group, variantKey, e.target.value);
                // handleVariationChange(e.target.value);
                // e.stopPropagation();
                console.log("changed");
                setValue(e.target.value);

                // getDropdown(e.target.value);
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
