import React, { useState, Fragment, useEffect, useContext } from 'react';
import Table from '../table/TableSummer';
import Logistics from '../logistics/Logistics';
// import CardItem from "../cards/CardItem_Title";
import SplitButton from '../SplitButton';
import './section.scss';
import { capitalize } from 'lodash';
import AppContext from '../../contexts/AppContext';
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    (e) => {
      setValues({
        ...values,
        [e.target.id]: e.target.value,
      });
    },
  ];
};
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const Review = ({
  snacks,
  vegans,
  addOns,
  fallMenus,
  customizations,
  selectedPackage,
  selectedGoal,
  shipping,
  handleSelect,
  selectedDelivery,
  deliveryOption,
  setDeliveryOption,
  deliveryTime,
  setDeliveryTime,
  deliveryDay,
  setDeliveryDay,
  total,
  isContactValid,
  handleIsContactValid,
  handleProceed,
}) => {
  const appContext = useContext(AppContext);
  const [submittedCust, setSubmittedCust] = useState('');
  const [paymentOption, setPaymentOption] = useState('cash');
  const setPayment = (option) => (e) => {
    e.preventDefault();
    setPaymentOption(option);
  };
  // const [cityIndex, setCityIndex] = useState("");
  const [deliveryDayValue, setDeliveryDayValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [values, handleChange] = useForm({
    fullName: '',
    // email: "",
    phone: '',
    address: '',
    address2: '',
    // city: "",
    postalCode: '',
    specialInstructions: '',
  });

  const checkEmail = () => {
    setIsEmailValid(emailRegex.test(email));
    // setEmail(e);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    checkEmail();
  };
  useEffect(() => {
    // const replacer = (key, value) =>
    //     value === null || value.length === 0 ? "none" : value; // specify how you want to handle null values here
    const header = Object.keys(fallMenus[0]);
    const fallMenuCsv = fallMenus.map((row) => {
      //   console.log(row);
      return header
        .map((fieldName) => {
          const formattedFieldName = fieldName
            .split('_')
            .map((w) => capitalize(w))
            .join(' ');
          return fieldName === `customization_price`
            ? null
            : `${formattedFieldName}: ${
                row[fieldName].constructor === Object
                  ? row[fieldName] && row[fieldName].variation
                    ? row[fieldName].variation
                    : row[fieldName].post_title || `None`
                  : row[fieldName]
              }`;
          // return JSON.stringify(
          //     `${formattedFieldName} : ${row[fieldName]}`,
          //     replacer
          // );
        })
        .join('\r\n');
    });
    const addOnCsv =
      addOns.length > 0
        ? addOns
            .map((row) => {
              return `Snack: ${row.snack.post_title}
            Quantity: ${row.count}
            `;
            })
            .join('\r\n')
        : '';
    const csv = [...fallMenuCsv, addOnCsv].join('\r\n');
    // console.log(csv);
    setSubmittedCust(csv);
    // console.log(customizations);
    // console.log(submittedCust);
  }, [fallMenus, addOns, submittedCust]);

  useEffect(() => {
    setDeliveryDayValue(shipping.delivery_days[+deliveryDay]?.day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryDayValue, deliveryDay]);

  useEffect(() => {
    setCityValue(shipping.delivery_locations[+selectedDelivery]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityValue, selectedDelivery]);

  useEffect(() => {
    // validate for when selected delivery method is delivery
    if (deliveryOption === 'delivery') {
      if (
        deliveryDay !== 'default' &&
        selectedDelivery !== 'default' &&
        values.fullName.length > 0 &&
        values.phone.length > 0 &&
        values.address.length > 0 &&
        isEmailValid
      ) {
        handleIsContactValid(true);
      } else {
        handleIsContactValid(false);
      }
    } else {
      //validate for when selected delivery method is pickup
      if (values.fullName.length > 0 && values.phone.length > 0 && isEmailValid) {
        handleIsContactValid(true);
      } else {
        handleIsContactValid(false);
      }
    }
    handleProceed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    deliveryOption,
    deliveryDay,
    selectedDelivery,
    isEmailValid,
    values.address,
    values.fullName,
    values.phone,
  ]);
  useEffect(() => {
    handleProceed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContactValid]);
  // useEffect(() => {
  //     submittedCust.forEach(c => {
  //         const veg = c.selectedVeg.join();
  //         return { ...c, selectedVeg: veg };
  //     });
  //     console.log(submittedCust);
  // }, [submittedCust]);
  return (
    <Fragment>
      <section className='section section--review'>
        <div className='section__item'>
          <h2 className='section__heading'>Review Your Order</h2>
          <p className='section__subheading'>
            Take a look at your orders and make sure that we have everything you want and need!
          </p>
          <div className='grid-x grid-margin-x section__grid'>
            <div className='cell small-12 large-6'>
              <Table
                fallMenus={fallMenus}
                addOns={addOns}
                selectedPackage={selectedPackage}
                shipping={shipping}
                goal={selectedGoal}
                selectedDelivery={selectedDelivery}
                deliveryOption={deliveryOption}
                total={total}
              />
            </div>
            <div className='cell small-12 large-6'>
              <Logistics
                handleSelect={handleSelect}
                shipping={shipping}
                setDeliveryOption={setDeliveryOption}
                deliveryOption={deliveryOption}
                values={values}
                handleChange={handleChange}
                city={selectedDelivery === 'default' ? 'default' : selectedDelivery}
                email={email}
                setEmail={handleEmail}
                checkEmail={checkEmail}
                isEmailValid={isEmailValid}
                deliveryTime={deliveryTime}
                setDeliveryTime={setDeliveryTime}
                deliveryDay={deliveryDay}
                setDeliveryDay={setDeliveryDay}
              />
            </div>
          </div>
        </div>
      </section>
      <section className='section section--payment'>
        <div className='section__item'>
          <h2 className='section__heading'>Payment Option</h2>
          <p className='section__subheading'>
            Unfortunately, we currently do not accept pre-payment via credit card or debit card.
            Cash or e-Transfer only.
          </p>
          <div className='grid-x grid-margin-x section__grid align-center'>
            <div
              onClick={setPayment('cash')}
              className={
                'card text-center small-12 medium-6 large-4 card__item card__item--title ' +
                (paymentOption === 'cash' ? 'card__item--active' : '')
              }
            >
              <div className='card-divider'>{`Cash`}</div>
              <div className='card-section align-justify'>
                <p>{`Deposit Required. Paid on Day-Of.`}</p>
                <SplitButton
                  handleClick={setPayment('cash')}
                  text={paymentOption === 'cash' ? 'Selected' : 'Select'}
                  isActive={paymentOption === 'cash' ? true : false}
                />
              </div>
            </div>
            <div
              onClick={setPayment('etransfer')}
              className={
                'card text-center small-12 medium-6 large-4 card__item card__item--title ' +
                (paymentOption === 'etransfer' ? 'card__item--active' : '')
              }
            >
              <div className='card-divider'>{`E-Transfer`}</div>
              <div className='card-section'>
                <p>
                  {`Paid to `}
                  <a href='mailto:fitaxxmeals@gmail.com'>fitaxxmeals@gmail.com</a>
                </p>
                <p>Transferred by Sunday 9PM latest</p>
                <SplitButton
                  handleClick={setPayment('etransfer')}
                  text={paymentOption === 'etransfer' ? 'Selected' : 'Select'}
                  isActive={paymentOption === 'etransfer' ? true : false}
                />
              </div>
            </div>
          </div>
        </div>

        <input type='hidden' name='1' value={values.fullName} />
        <input type='hidden' name='2' value={`Fitaxx Special`} />
        <input type='hidden' name='3' value={`No Goal`} />
        <input type='hidden' name='5' value={total.toFixed(2)} />
        <input type='hidden' name='6' value={deliveryOption} />
        <input type='hidden' name='7' value={deliveryTime} />
        <input type='hidden' name='8' value={paymentOption} />
        <input type='hidden' name='18' value={email} />
        <input type='hidden' name='10' value={values.phone} />
        <input type='hidden' name='11' value={values.address} />
        <input type='hidden' name='12' value={values.address2} />
        <input type='hidden' name='13' value={cityValue?.location ?? ''} />
        <input type='hidden' name='14' value={values.postalCode} />
        <input type='hidden' name='15' value={values.specialInstructions} />
        <input type='hidden' name='16' value={submittedCust} />
        <input type='hidden' name='17' value={`No`} />
        <input type='hidden' name='19' value={appContext.appliedCode} />
        <input type='hidden' name='20' value={deliveryDayValue} />
      </section>
    </Fragment>
  );
};

export default Review;
