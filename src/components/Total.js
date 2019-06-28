import React from "react";

const Total = ({ itemCount, packagePrice, selectedGoal }) => {
    return (
        <div style={{}}>
            {itemCount}
            {" Items"}{" "}
            {packagePrice.acf &&
                `$${+packagePrice.acf.price + (selectedGoal === 164 ? 1 : 0)}`}
        </div>
    );
};

export default Total;
