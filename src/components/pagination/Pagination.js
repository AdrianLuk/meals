import React from "react";
import PaginationButton from "./PaginationButton";
import "./pagination.scss";

const Pagination = ({
    step,
    handleNextStepChange,
    handlePrevStepChange,
    canProceed
}) => {
    return (
        <div className="pagination__list">
            <PaginationButton
                isDisabled={step <= 1 ? true : false}
                type="button"
                text="Back"
                handleStepChange={handlePrevStepChange}
            />
            <PaginationButton
                isDisabled={!canProceed ? true : false}
                text={step > 2 ? "Submit" : "Next"}
                type={step > 2 ? "submit" : "button"}
                handleStepChange={handleNextStepChange}
            />
        </div>
    );
};

export default Pagination;
