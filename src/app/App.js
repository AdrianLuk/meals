import React, { Fragment, useState } from 'react';

import Form from '../components/Form';
import FormSnack from '../components/FormSnack';
// import "./foundation.min.css";
import './App.scss';
import FormVegan from '../components/FormVegan';
import FormJuice from '../components/FormJuice';
// import Button from "../components/pagination/PaginationButton";
// import CardItem from "../components/cards/CardItem_Title";
const SNACK = 'snack';
const MEAL = 'meal';
const VEGAN = 'vegan';
const JUICE = 'juice';
const App = ({ homeUrl }) => {
  const [formType, setFormType] = useState(null);
  const renderForm = (type) => {
    switch (type) {
      case SNACK:
        return <FormSnack homeUrl={homeUrl} />;
      case MEAL:
        return <Form homeUrl={homeUrl} />;
      case VEGAN:
        return <FormVegan homeUrl={homeUrl} />;
      case JUICE:
        return <FormJuice homeUrl={homeUrl} />;
      default:
        return null;
    }
  };
  return (
    <Fragment>
      <form
        id="order-form"
        className="order"
        action={`${
          homeUrl ?? ''
        }/wp-content/themes/fitaxxmeals/page-templates/inc/process-order.php`}
        encType="multipart/form-data"
        method="post"
      >
        <div id="form-anchor" />
        {!formType && (
          <section
            style={{ minHeight: 200 }}
            className="section grid-container"
          >
            <div className="section__item">
              <h2 style={{ textAlign: 'center' }} className="section__heading">
                Select Menu
              </h2>
              <p
                className="section__subheading"
                style={{ textAlign: 'center' }}
              >
                Choose which menu you'd like to order from.
              </p>
              <div className="section__grid grid-x grid-margin-x align-large-justify align-spaced">
                <div
                  onClick={() => setFormType(MEAL)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className="card-divider">{`Meals`}</div>
                  <div className="card-section">
                    <p>{`Customize your own meals`}</p>
                    <button
                      onClick={() => setFormType(MEAL)}
                      className={'input-group select-button '}
                    >
                      <span className="input-group-field select-button__text">
                        {`Select`}
                      </span>
                      <span
                        className={
                          'input-group-label select-button__icon fa fa-arrow-right'
                        }
                      />
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => setFormType(SNACK)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className="card-divider">{`Snacks`}</div>
                  <div className="card-section">
                    <p>{`Healthy snacks for the munchies`}</p>
                    <button
                      onClick={() => setFormType(SNACK)}
                      className={'input-group select-button '}
                    >
                      <span className="input-group-field select-button__text">
                        {`Select`}
                      </span>
                      <span
                        className={
                          'input-group-label select-button__icon fa fa-arrow-right'
                        }
                      />
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => setFormType(VEGAN)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className="card-divider">{`Vegan`}</div>
                  <div className="card-section">
                    <p>{`Vegan Menu`}</p>
                    <button
                      onClick={() => setFormType(VEGAN)}
                      className={'input-group select-button '}
                    >
                      <span className="input-group-field select-button__text">
                        {`Select`}
                      </span>
                      <span
                        className={
                          'input-group-label select-button__icon fa fa-arrow-right'
                        }
                      />
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => setFormType(JUICE)}
                  className={
                    'card text-center small-12 medium-6 card__item card__item--title card__item--active'
                  }
                >
                  <div className="card-divider">{`Juices`}</div>
                  <div className="card-section">
                    <p>{`Juice Menu`}</p>
                    <button
                      onClick={() => setFormType(JUICE)}
                      className={'input-group select-button '}
                    >
                      <span className="input-group-field select-button__text">
                        {`Select`}
                      </span>
                      <span
                        className={
                          'input-group-label select-button__icon fa fa-arrow-right'
                        }
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        {renderForm(formType)}
      </form>
    </Fragment>
  );
};

export default App;
