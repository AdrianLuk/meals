import React, { useState } from 'react';

import Form from '../components/Form';
import FormSnack from '../components/FormSnack';
// import "./foundation.min.css";
import './App.scss';
import FormVegan from '../components/FormVegan';
// import FormJuice from '../components/FormJuice';
import FormFallMenu from '../components/FormFallMenu';
import { AppProvider } from '../contexts/AppContext';
import FormSummer from '../components/FormSummer';
import {
  SUMMER_ADDONS_REMAINING,
  SUMMER_FALL_MENUS_REMAINING,
  SUMMER_PRICE,
} from '../components/constants';
// import Button from "../components/pagination/PaginationButton";
// import CardItem from "../components/cards/CardItem_Title";
const SNACK = 'snack';
const MEAL = 'meal';
const VEGAN = 'vegan';
// const JUICE = 'juice';
const PREMADE = 'fall_menu';
const SUMMER = 'summer';
const App = ({ homeUrl }) => {
  const [formType, setFormType] = useState(null);
  const [codeInput, setCodeInput] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const renderForm = (type) => {
    switch (type) {
      case SUMMER:
        return <FormSummer homeUrl={homeUrl} discount={discount} />;
      case SNACK:
        return <FormSnack homeUrl={homeUrl} discount={discount} />;
      case MEAL:
        return <Form homeUrl={homeUrl} discount={discount} />;
      case VEGAN:
        return <FormVegan homeUrl={homeUrl} discount={discount} />;
      // case JUICE:
      //   return <FormJuice homeUrl={homeUrl} discount={discount} />;
      case PREMADE:
        return <FormFallMenu homeUrl={homeUrl} discount={discount} />;
      default:
        return null;
    }
  };
  return (
    <AppProvider
      value={{
        homeUrl,
        discount,
        setDiscount,
        codeInput,
        setCodeInput,
        appliedCode,
        setAppliedCode,
      }}
    >
      <form
        id='order-form'
        className='order'
        action={`${
          homeUrl ?? ''
        }/wp-content/themes/fitaxxmeals/page-templates/inc/process-order.php`}
        encType='multipart/form-data'
        method='post'
      >
        <div id='form-anchor' />
        {!formType && (
          <section style={{ minHeight: 200 }} className='section grid-container'>
            <div className='section__item'>
              <h2 style={{ textAlign: 'center' }} className='section__heading'>
                Select Menu
              </h2>
              <p className='section__subheading' style={{ textAlign: 'center' }}>
                Choose which menu you'd like to order from.
              </p>
              <div className='section__grid grid-x grid-margin-x align-large-justify align-spaced'>
                <div
                  onClick={() => setFormType(SUMMER)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className='card-divider'>{`Fitaxx Special`}</div>
                  <div className='card-section'>
                    <p>{`Choose ${SUMMER_FALL_MENUS_REMAINING} meals and ${SUMMER_ADDONS_REMAINING} snacks for $${SUMMER_PRICE}`}</p>
                    <button
                      onClick={() => setFormType(SUMMER)}
                      className={'input-group select-button '}
                    >
                      <span className='input-group-field select-button__text'>{`Select`}</span>
                      <span className={'input-group-label select-button__icon fa fa-arrow-right'} />
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => setFormType(MEAL)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className='card-divider'>{`Meals`}</div>
                  <div className='card-section'>
                    <p>{`Customize your own meals`}</p>
                    <button
                      onClick={() => setFormType(MEAL)}
                      className={'input-group select-button '}
                    >
                      <span className='input-group-field select-button__text'>{`Select`}</span>
                      <span className={'input-group-label select-button__icon fa fa-arrow-right'} />
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => setFormType(PREMADE)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className='card-divider'>{`Pre-made Meals`}</div>
                  <div className='card-section'>
                    <p>{`Choose from premade meals.`}</p>
                    <button
                      onClick={() => setFormType(PREMADE)}
                      className={'input-group select-button '}
                    >
                      <span className='input-group-field select-button__text'>{`Select`}</span>
                      <span className={'input-group-label select-button__icon fa fa-arrow-right'} />
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => setFormType(SNACK)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className='card-divider'>{`Snacks`}</div>
                  <div className='card-section'>
                    <p>{`Healthy snacks for the munchies`}</p>
                    <button
                      onClick={() => setFormType(SNACK)}
                      className={'input-group select-button '}
                    >
                      <span className='input-group-field select-button__text'>{`Select`}</span>
                      <span className={'input-group-label select-button__icon fa fa-arrow-right'} />
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => setFormType(VEGAN)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className='card-divider'>{`Vegan`}</div>
                  <div className='card-section'>
                    <p>{`Vegan Menu`}</p>
                    <button
                      onClick={() => setFormType(VEGAN)}
                      className={'input-group select-button '}
                    >
                      <span className='input-group-field select-button__text'>{`Select`}</span>
                      <span className={'input-group-label select-button__icon fa fa-arrow-right'} />
                    </button>
                  </div>
                </div>
                {/* <div
                  onClick={() => setFormType(JUICE)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className='card-divider'>{`Juices`}</div>
                  <div className='card-section'>
                    <p>{`Juice Menu`}</p>
                    <button
                      onClick={() => setFormType(JUICE)}
                      className={'input-group select-button '}
                    >
                      <span className='input-group-field select-button__text'>{`Select`}</span>
                      <span className={'input-group-label select-button__icon fa fa-arrow-right'} />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </section>
        )}
        {renderForm(formType)}
      </form>
    </AppProvider>
  );
};

export default App;
