import React from "react";

const PaginationButton = ({ text, handleStepChange, isDisabled, type }) => {
    return (
        <button type={type} disabled={isDisabled} onClick={handleStepChange}>
            {text}
        </button>
    );
};

export default PaginationButton;
