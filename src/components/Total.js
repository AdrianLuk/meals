import React from "react";

const Total = ({ itemCount, packagePrice, selectedGoal }) => {
    return (
        <div style={{ position: "fixed", top: "2%", right: "2%" }}>
            {itemCount}{" "}
            {packagePrice.acf &&
                `$${+packagePrice.acf.price + (selectedGoal === 164 ? 1 : 0)}`}
        </div>
    );
};

export default Total;
