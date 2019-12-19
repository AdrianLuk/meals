import React from "react";

const SplitButton = ({
    handleClick,
    isActive,
    text
    // group,
    // handlePackageSelect,
    // handleSelect,
    // stateKey,
    // item
}) => {
    return (
        <button
            onClick={handleClick}
            className={
                "input-group select-button " +
                (isActive ? "select-button--is-active" : "")
            }>
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
