import React, { useState, useEffect } from "react";

const SelectDropdown = ({
  options,
  selected,
  handleSelect,
  setVariant,
  group,
  getDropdown
}) => {
  const [value, setValue] = useState(options[0]);
  const [dropdownVal, setDropdownVal] = useState(0);
  useEffect(() => {
    getDropdown(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <select
      style={{ borderRadius: 20, paddingLeft: "1rem" }}
      value={dropdownVal}
      onChange={e => {
        e.preventDefault();
        if (selected.id === group.id) {
          handleSelect(group);
          setVariant(options[e.target.value]);
        }
        setValue(options[e.target.value]);
        setDropdownVal(e.target.value);
      }}
    >
      {options.map((option, index) => (
        <option key={index} value={index}>
          {`${option.variation} ${
            parseFloat(option.extra_charge) > 0
              ? `(+$${parseFloat(option.extra_charge).toFixed(2)})`
              : ""
          }`}
        </option>
      ))}
    </select>
  );
};

export default SelectDropdown;
