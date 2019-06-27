import React from "react";

const SplitButton = ({
    isActive,
    text,
    group,
    handlePackageSelect,
    handleSelect,
    stateKey,
    item
}) => {
    return (
        <button
            onClick={
                group === "goals"
                    ? handleSelect(stateKey, item)
                    : handlePackageSelect(item)
            }
            className={"input-group select-button "}>
            <span className="input-group-field select-button__text">
                {text}
            </span>
            <span
                className={
                    "input-group-label select-button__icon fa " +
                    (isActive ? "fa-check" : "fa-arrow-right")
                }
            />
        </button>
    );
};

export default SplitButton;
