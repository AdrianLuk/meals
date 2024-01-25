import React from 'react';
import PaginationButton from './PaginationButton';
import './pagination.scss';

const Pagination = ({
  step,
  handleNextStepChange,
  handlePrevStepChange,
  canProceed,
  isSubmitting,
}) => {
  return (
    <div className='pagination__list'>
      <PaginationButton
        isDisabled={step <= 1}
        type='button'
        text='Back'
        handleStepChange={handlePrevStepChange}
      />
      <PaginationButton
        isDisabled={!canProceed || isSubmitting}
        text={step > 2 ? 'Submit' : 'Next'}
        type={step > 2 ? 'submit' : 'button'}
        handleStepChange={handleNextStepChange}
      />
    </div>
  );
};

export default Pagination;
