import React from "react";

const StepList = ({ step }) => {
    let text;
    switch (step) {
        case 1:
            text = "Choose";
            break;
        case 2:
            text = "Customize";
            break;
        case 3:
            text = "Review";
            break;
        default:
            text = "";
    }
    return (
        <div>
            Step: {step} &nbsp; {text}
        </div>
    );
};

export default StepList;
