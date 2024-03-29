import React from 'react';

const PaginationButton = ({ text, handleStepChange, isDisabled, type }) => {
  return (
    <button
      className={'pagination__item ' + (!isDisabled ? 'pagination__item--active' : '')}
      type={type}
      disabled={isDisabled}
      onClick={(e) => handleStepChange(e)}
    >
      {text}
    </button>
  );
};

export default PaginationButton;
