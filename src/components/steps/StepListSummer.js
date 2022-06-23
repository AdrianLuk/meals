import React from 'react';
import './steps.scss';
// import StepItem from "./StepItem";

const StepList = ({ step }) => {
  return (
    <div className='step-list cell small-12 large-auto'>
      <div className={'step-item ' + (step >= 2 ? 'is-active' : '')}>
        <div className='step-index'>1</div>
        <div className='step-name'>Customize</div>
      </div>
      <hr className={'step-separator ' + (step > 2 ? 'is-active' : '')} />
      <div className={'step-item ' + (step === 3 ? 'is-active' : '')}>
        <div className='step-index'>2</div>
        <div className='step-name'>Review &amp; Confirm</div>
      </div>
    </div>
  );
};

export default StepList;
