import React from "react";
import PaginationButton from "./PaginationButton";

const Pagination = ({ step, handleNextStepChange, handlePrevStepChange }) => {
    return (
        <div>
            <PaginationButton
                isDisabled={step <= 1 ? true : false}
                text="Back"
                handleStepChange={handlePrevStepChange}
            />
            <PaginationButton
                isDisabled={step > 3 ? true : false}
                text="Next"
                handleStepChange={handleNextStepChange}
            />
        </div>
    );
};

export default Pagination;
