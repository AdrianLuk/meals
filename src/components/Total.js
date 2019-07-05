import React from "react";

const Total = ({
    step,
    itemCount,
    packagePrice,
    selectedGoal,
    selectedDelivery,
    deliveryOption,
    totalCustomizations,
    customizationsRemaining
}) => {
    return (
        <div className="total">
            {step === 2 && (
                <span
                    className={
                        "total__label " +
                        (step === 2 ? "total__label--border-right" : "")
                    }>{`${totalCustomizations -
                    customizationsRemaining} / ${totalCustomizations}`}</span>
            )}
            <span className="total__label">{`${itemCount} Meals`}</span>
            {packagePrice.acf && (
                <span className="total__price">
                    {`$${(
                        +packagePrice.acf.price +
                        (selectedGoal.acf
                            ? +selectedGoal.acf.portion_price
                            : 0) +
                        (selectedDelivery.price && deliveryOption === "delivery"
                            ? +selectedDelivery.price
                            : 0)
                    ).toFixed(2)}`}
                </span>
            )}
        </div>
    );
};

export default Total;
