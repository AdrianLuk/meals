import React, { Fragment } from "react";

const StepItem = ({ step, itemStep, text }) => {
    return (
        <Fragment>
            <div
                className={
                    "step-item " + (step >= itemStep ? "is-active" : "")
                }>
                <div className="step-index">{itemStep}</div>
                <div className="step-name">{text}</div>
            </div>
            <hr
                className={
                    "step-separator " + (step > itemStep ? "is-active" : "")
                }
            />
        </Fragment>
    );
};

export default StepItem;
