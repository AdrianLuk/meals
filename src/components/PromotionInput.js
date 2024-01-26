import axios from 'axios';
import React, { useContext, useState } from 'react';
import AppContext from '../contexts/AppContext';
import FormContext from '../contexts/Form';

const NONE = 'none';
const VALID = 'valid';
const INVALID = 'invalid';
const NO_EMAIL_OR_CODE = 'no_email_or_code';
const NO_EMAIL = 'no_email';
const NO_CODE = 'no_code';
const NONEXISTENT_CODE = 'nonexistent_code';
const ALREADY_USED = 'already_used';
const MINIMUM_UNMET = 'minimum_unmet';

const PromotionInput = ({ email }) => {
  const appContext = useContext(AppContext);
  const formContext = useContext(FormContext);
  const [isCodeApplied, setisCodeApplied] = useState(false);
  const [promoCodeStatus, setPromoCodeStatus] = useState(NONE);
  const [promoCodeError, setPromoCodeError] = useState(null);
  const handleChange = (e) => {
    appContext.setCodeInput(e.target.value.toUpperCase().trim());
  };
  const verifyPromoCode = async (email, code) => {
    const response = await axios.get(`${appContext.homeUrl}/wp-json/fitaxx/v1/verify-promo-code`, {
      params: { email, code },
    });
    return response.data;
  };

  const renderPromoInputMessage = (status, error) => {
    let errorMsg;
    switch (error) {
      case NO_EMAIL_OR_CODE:
        errorMsg = 'Please enter your email and a valid promo code.';
        break;
      case NO_EMAIL:
        errorMsg = 'Please enter your email in order to apply a promo code.';
        break;
      case NO_CODE:
        errorMsg = 'Please enter a promo code to be applied.';
        break;
      case NONEXISTENT_CODE:
        errorMsg = 'Invalid promo code.';
        break;
      case ALREADY_USED:
        errorMsg = 'This email has already used this promo code.';
        break;
      case MINIMUM_UNMET:
        errorMsg = 'Minimum order amount not met.';
        break;
      default:
        errorMsg = 'Unable to apply promo code.';
        break;
    }
    return status !== NONE ? (
      <div className='small-12 cell'>
        {status === VALID ? (
          <div className='msg success-msg'>Promo code successfully applied.</div>
        ) : (
          <div className='msg error-msg'>{errorMsg}</div>
        )}
      </div>
    ) : null;
  };

  const handleApplyCodeClick = async () => {
    // if both email and code fields empty
    if (!email && !appContext.codeInput) {
      setPromoCodeError(NO_EMAIL_OR_CODE);
      setPromoCodeStatus(INVALID);
      appContext.setDiscount(0);
      appContext.setAppliedCode('');
      setisCodeApplied(false);
      return false;
    } else if (!email) {
      // if email empty
      setPromoCodeError(NO_EMAIL);
      setPromoCodeStatus(INVALID);
      appContext.setDiscount(0);
      appContext.setAppliedCode('');
      setisCodeApplied(false);
      return false;
    } else if (!appContext.codeInput) {
      // if code field empty
      setPromoCodeError(NO_CODE);
      setPromoCodeStatus(INVALID);
      appContext.setDiscount(0);
      appContext.setAppliedCode('');
      setisCodeApplied(false);
      return false;
    }
    const promoVerification = await verifyPromoCode(email, appContext.codeInput);
    // console.log(promoVerification);
    if (promoVerification.status === VALID) {
      if (
        +formContext.total -
          (formContext.selectedDeliveryLocation !== 'default' &&
          formContext.deliveryOption === 'delivery'
            ? +formContext.shippingOptions.delivery_locations[formContext.selectedDeliveryLocation]
                .price
            : 0) <
          +promoVerification.data?.minimum_order_amount &&
        !isCodeApplied
      ) {
        // if current total without any discounts applied is less than the minimum order amount for the promo code
        setPromoCodeError(MINIMUM_UNMET);
        setPromoCodeStatus(INVALID);
        appContext.setDiscount(0);
        appContext.setAppliedCode('');
        setisCodeApplied(false);
        return false;
      } else {
        setPromoCodeError(null);
        setPromoCodeStatus(VALID);
        appContext.setDiscount(promoVerification.data);
        appContext.setAppliedCode(appContext.codeInput);
        setisCodeApplied(true);
      }
    } else {
      if (promoVerification?.reason === NONEXISTENT_CODE) {
        setPromoCodeError(NONEXISTENT_CODE);
      }
      if (promoVerification?.reason === ALREADY_USED) {
        setPromoCodeError(ALREADY_USED);
      }
      setPromoCodeStatus(INVALID);
      appContext.setDiscount(0);
      appContext.setAppliedCode('');
      setisCodeApplied(false);
    }
    // code is only valid if is_active is true
    // const isValidCode = appContext.promoCodes
    //   .filter((code) => !!code.is_active)
    //   .some((promoCode) => promoCode.code === appContext.codeInput);
    // if (appContext.codeInput === '') {
    //   setPromoCodeStatus(NONE);
    //   setisCodeApplied(false);
    //   appContext.setDiscount(0);
    // } else if (isValidCode) {
    //   setPromoCodeStatus(VALID);
    //   appContext.setDiscount(
    //     +appContext.promoCodes.find(
    //       (promoCode) => promoCode.code === appContext.codeInput
    //     ).discount_amount
    //   );
    //   setisCodeApplied(true);
    // } else {
    //   setPromoCodeStatus(INVALID);
    //   appContext.setDiscount(0);
    //   setisCodeApplied(false);
    // }
  };
  return (
    <>
      <div className='small-12 cell input-group'>
        <input
          onChange={handleChange}
          value={appContext.codeInput}
          placeholder={`Promo Code`}
          type='text'
          className='input-group-field logistics__input'
          style={{ borderRight: 0 }}
        />
        <div className='input-group-button'>
          <input
            type='button'
            value='Apply Code'
            className={`logistics__input__button`}
            onClick={handleApplyCodeClick}
          />
        </div>
      </div>
      {renderPromoInputMessage(promoCodeStatus, promoCodeError)}
    </>
  );
};

export default PromotionInput;
