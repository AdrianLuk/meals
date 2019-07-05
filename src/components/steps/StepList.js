import React from "react";
import "./steps.scss";
// import StepItem from "./StepItem";

const StepList = ({ step }) => {
    return (
        <div className="step-list cell small-12 large-8">
            <div className={"step-item " + (step >= 1 ? "is-active" : "")}>
                <div className="step-index">1</div>
                <div className="step-name">Choose</div>
            </div>
            <hr className={"step-separator " + (step > 1 ? "is-active" : "")} />
            <div className={"step-item " + (step >= 2 ? "is-active" : "")}>
                <div className="step-index">2</div>
                <div className="step-name">Customize</div>
            </div>
            <hr className={"step-separator " + (step > 2 ? "is-active" : "")} />
            <div className={"step-item " + (step === 3 ? "is-active" : "")}>
                <div className="step-index">3</div>
                <div className="step-name">Review &amp; Confirm</div>
            </div>
        </div>
    );
};

export default StepList;
