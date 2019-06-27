import React, { useState, useEffect } from "react";

const SelectDropdown = ({
    options,
    selected,
    handleSelect,
    setVariant,
    group,
    getDropdown
}) => {
    const [value, setValue] = useState(options[0].variation);
    useEffect(() => {
        getDropdown(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return (
        <select
            style={{ borderRadius: 20, paddingLeft: "1rem" }}
            value={value}
            onChange={e => {
                e.preventDefault();
                if (selected.id === group.id) {
                    handleSelect(group);
                    setVariant(e.target.value);
                }
                setValue(e.target.value);
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
