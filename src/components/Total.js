import React from "react";

const Total = ({
  step,
  itemCount,
  packagePrice,
  selectedGoal,
  selectedDelivery,
  deliveryOption,
  totalCustomizations,
  customizationsRemaining,
  total
}) => {
  return (
    <div className="total">
      {step === 2 && (
        <span
          className={
            "total__label " + (step === 2 ? "total__label--border-right" : "")
          }
        >
          {`${totalCustomizations -
            customizationsRemaining} / ${totalCustomizations}`}{" "}
          <span className="total__label--customize">Customized</span>
        </span>
      )}
      <span className="total__label">{`${itemCount} Meals`}</span>
      {total && <span className="total__price">{`$${total.toFixed(2)}`}</span>}
    </div>
  );
};

export default Total;
