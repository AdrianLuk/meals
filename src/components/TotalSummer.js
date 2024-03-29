import React from 'react';

const TotalSummer = ({
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
    <div className='total'>
      {/* <span className='total__label'>{`${itemCount || 0} Meals`}</span> */}
      {total && <span className='total__price'>{`$${total.toFixed(2)}`}</span>}
    </div>
  );
};

export default TotalSummer;
