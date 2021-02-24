import React, { useContext } from 'react';
import CardList from '../cards/CardListJuice';
import './section.scss';
import FormContext from '../../contexts/Form';

const Customize = ({
  carbs,
  meats,
  vegetables,
  snacks,
  juices,
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
    <section className="section section--customize">
      <CardList groupName="juice" groups={juices} />
      <hr />
      <div className="section__item">
        <h3 className="section__heading">Comments</h3>
        <p className="section__subheading">
          Please add any comments for your order
        </p>
        <div className="customize__textarea-container">
          <textarea
            className="customize__textarea"
            value={comments}
            onChange={(e) => form.handleComments(e.target.value)}
            name=""
            id=""
            rows={4}
          />
        </div>
      </div>
    </section>
  );
};

export default Customize;
