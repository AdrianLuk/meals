import React, { useContext } from 'react';
import CardList from '../cards/CardListFallMenu';
import './section.scss';
import FormContext from '../../contexts/Form';

const Customize = ({
  carbs,
  meats,
  vegetables,
  snacks,
  salads,
  vegans,
  fallMenus,
  winterMenus,
  customizationCount,
  addToOrder,
  currentCustomizationId,
  // customizations,
  customizationsRemaining,
  handleCustomizationAmountIncrement,
  handleCustomizationAmountChange,
  handleCustomizationAmountDecrement,
  comments,
}) => {
  const form = useContext(FormContext);
  return (
    <section className='section section--customize'>
      <CardList groupName='premade item' groups={fallMenus} />
      <hr />
      <CardList groupName='winter menu item' groups={winterMenus} />
      <hr />
      <div className='section__item'>
        <h3 className='section__heading'>Comments</h3>
        <p className='section__subheading'>Please add any comments for your order</p>
        <p className='section__subheading'>
          <em>
            Please Note: Items in meals can be removed but not substituted. For more information,{' '}
            <a href={`${form.baseURL}/frequently-asked-questions`}>click here</a>
          </em>
        </p>
        <div className='customize__textarea-container'>
          <textarea
            className='customize__textarea'
            value={comments}
            onChange={(e) => form.handleComments(e.target.value)}
            name=''
            id=''
            rows={4}
          />
        </div>
      </div>
    </section>
  );
};

export default Customize;
