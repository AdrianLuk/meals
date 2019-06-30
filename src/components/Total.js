import React from "react";

const Total = ({ itemCount, packagePrice, selectedGoal }) => {
    return (
        <div className="total">
            <span className="total__label">
                {itemCount}
                {" Items"}
            </span>
            {packagePrice.acf && (
                <span className="total__price">
                    {`$${(
                        +packagePrice.acf.price + (selectedGoal === 164 ? 1 : 0)
                    ).toFixed(2)}`}
                </span>
            )}
        </div>
    );
};

export default Total;
