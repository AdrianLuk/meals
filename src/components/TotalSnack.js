import React from 'react';

const TotalSnack = ({
  step,
  itemCount,
  packagePrice,
  selectedGoal,
  selectedDelivery,
  deliveryOption,
  totalCustomizations,
  customizationsRemaining,
  total,
}) => {
  return (
    <div className="total">
      <span className="total__label">{`${itemCount || 0} Snacks`}</span>
      {total && <span className="total__price">{`$${total.toFixed(2)}`}</span>}
    </div>
  );
};

export default TotalSnack;
