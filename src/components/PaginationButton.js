import React from "react";

const PaginationButton = ({ text, handleStepChange, isDisabled }) => {
    return (
        <button disabled={isDisabled} onClick={handleStepChange}>
            {text}
        </button>
    );
};

export default PaginationButton;
