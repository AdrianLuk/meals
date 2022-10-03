import React, { Fragment } from 'react';
import SplitButton from '../SplitButton';
import Cleave from 'cleave.js/react';
import './logistics.scss';
// eslint-disable-next-line no-unused-vars
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.ca';
import PromotionInput from '../PromotionInput';

// const useForm = initialValues => {
//     const [values, setValues] = useState(initialValues);
//     return [
//         values,
//         e => {
//             setValues({
//                 ...values,
//                 [e.target.id]: e.target.value
//             });
//         }
//     ];
// };

const Logistics = ({
  shipping,
  handleSelect,
  setDeliveryOption,
  deliveryOption,
  deliveryTime,
  setDeliveryTime,
  values,
  handleChange,
  city,
  setCity,
  email,
  isEmailValid,
  checkEmail,
  setEmail,
}) => {
  return (
    <div className='logistics'>
      <div className='logistics__grid logistics__buttons grid-x grid-margin-x align-spaced'>
        <SplitButton
          isActive={deliveryOption === 'delivery' ? true : false}
          handleClick={setDeliveryOption('delivery')}
          text={`Delivery`}
        />
        {/* <SplitButton
          isActive={deliveryOption === 'pickup' ? true : false}
          handleClick={setDeliveryOption('pickup')}
          text={`Pick Up`}
        /> */}
      </div>
      <div className='logistics__grid logistics__form-fields grid-x grid-margin-x'>
        {/* {deliveryOption === 'pickup' && (
          <Fragment>
            <p className='logistics__text small-12 large-5 cell'>
              <span className='logistics__text--label'>Pickup Address:</span>
              <span className='logistics__text--address'>
                1050 The Queensway
                <br />
                Etobicoke, ON M8Z 0A8
              </span>
            </p>
            <iframe
              title='google-map'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.4225986611723!2d-79.51912848270673!3d43.62345496402142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b37d29a6109d5%3A0x9c6a7f1d70f0128!2s1050+The+Queensway%2C+Etobicoke%2C+ON+M8Z+0A8!5e0!3m2!1sen!2sca!4v1563905780053!5m2!1sen!2sca'
              className='small-12 large-7 cell logistics__map'
              width='200'
              height='200'
              frameBorder='0'
              style={{ border: 0 }}
              allowFullScreen
            />
          </Fragment>
        )} */}
        <input
          onChange={handleChange}
          value={values.fullName}
          id='fullName'
          placeholder={`Full Name*`}
          type='text'
          className='small-12 cell logistics__input'
        />
        <div className='small-12 large-6 cell'>
          <input
            onChange={setEmail}
            onBlur={checkEmail}
            value={email}
            id='email'
            placeholder={`Email*`}
            type='email'
            className='logistics__input'
          />
          {!isEmailValid && <p className='error-msg'>Please enter valid email</p>}
        </div>
        <Cleave
          className='small-12 large-6 cell logistics__input'
          options={{ phone: true, phoneRegionCode: 'CA' }}
          onChange={handleChange}
          placeholder={`Phone Number*`}
          id='phone'
          value={values.phone}
        />
        {deliveryOption === 'delivery' && (
          <Fragment>
            <input
              className='small-12 cell logistics__input'
              type='text'
              id='address'
              onChange={handleChange}
              value={values.address}
              placeholder={`Address*`}
            />
            <input
              className='small-12 cell logistics__input'
              type='text'
              id='address2'
              onChange={handleChange}
              value={values.address2}
              placeholder={`Address Line 2`}
            />
            <select
              onChange={(e) => {
                handleSelect(e.target.value);
              }}
              value={city}
              id='city'
              className='small-12 large-6 cell logistics__input'
            >
              <option value={`default`} disabled>
                City*
              </option>
              {shipping.delivery_locations.map((location, index) => (
                <option key={index} value={index}>{`${location.location} ($${parseFloat(
                  location.price
                ).toFixed(2)})`}</option>
              ))}
            </select>
            <Cleave
              className='small-12 large-6 cell logistics__input'
              options={{ blocks: [3, 3], uppercase: true }}
              id='postalCode'
              onChange={handleChange}
              value={values.postalCode}
              placeholder={`Postal Code`}
            />
          </Fragment>
        )}
        <input
          onChange={handleChange}
          value={values.specialInstructions}
          id='specialInstructions'
          placeholder={`Special Instructions`}
          type='text'
          className='small-12 cell logistics__input'
        />
        <PromotionInput email={email} />
        {/* {shipping.delivery_times.map((time, index) => (
          <div key={index} className="cell small-12 large-6">
            <SplitButton
              text={time.timeframe}
              isActive={deliveryTime === time.timeframe ? true : false}
              handleClick={setDeliveryTime(time.timeframe)}
            />
          </div>
        ))} */}
        <div className='logistics__message cell small-12 font-normal'>{`Please note: Due to COVID-19, ${deliveryOption} will be between 10am - 7pm. A text message will be sent ${
          deliveryOption === 'delivery'
            ? `prior to delivery with the ETA.`
            : `when food is ready for pick-up.`
        }`}</div>
      </div>
    </div>
  );
};

export default Logistics;
