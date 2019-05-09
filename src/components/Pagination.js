import React from "react";
import PaginationButton from "./PaginationButton";

const Pagination = ({ step, handleNextStepChange, handlePrevStepChange }) => {
    return (
        <div>
            <PaginationButton
                isDisabled={step <= 1 ? true : false}
                type="button"
                text="Back"
                handleStepChange={handlePrevStepChange}
            />
            <PaginationButton
                text={step > 2 ? "Submit" : "Next"}
                type={step > 2 ? "submit" : "button"}
                handleStepChange={handleNextStepChange}
            />
        </div>
    );
};

export default Pagination;
