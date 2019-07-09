import React, { useState, Fragment, useEffect } from "react";
import Table from "../table/Table";
import Logistics from "../logistics/Logistics";
// import CardItem from "../cards/CardItem_Title";
import SplitButton from "../SplitButton";
import "./section.scss";
const useForm = initialValues => {
    const [values, setValues] = useState(initialValues);
    return [
        values,
        e => {
            setValues({
                ...values,
                [e.target.id]: e.target.value
            });
        }
    ];
};
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const Review = ({
    customizations,
    selectedPackage,
    selectedGoal,
    shipping,
    handleSelect,
    selectedDelivery,
    setDeliveryOption,
    deliveryOption,
    deliveryTime,
    setDeliveryTime,
    total,
    handleIsContactValid
}) => {
    let [submittedCust, setSubmittedCust] = useState(customizations);
    const [paymentOption, setPaymentOption] = useState("cash");
    const setPayment = option => e => {
        e.preventDefault();
        setPaymentOption(option);
    };
    const [cityIndex, setCityIndex] = useState("default");
    const [cityValue, setCityValue] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [values, handleChange] = useForm({
        fullName: "",
        // email: "",
        phone: "",
        address: "",
        address2: "",
        // city: "",
        postalCode: "",
        specialInstructions: ""
    });

    const checkEmail = () => {
        setIsEmailValid(emailRegex.test(email));
        // setEmail(e);
    };
    const handleEmail = e => {
        setEmail(e.target.value);
        checkEmail();
    };
    useEffect(() => {
        setSubmittedCust(customizations);
        console.log(customizations);
        console.log(submittedCust);
    }, [customizations, submittedCust]);

    useEffect(() => {
        setCityValue(shipping.delivery_locations[cityIndex]);
        console.log(cityValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityValue, cityIndex]);
    useEffect(() => {
        if (
            cityIndex !== "default" &&
            values.fullName !== "" &&
            values.phone !== "" &&
            isEmailValid
        ) {
            handleIsContactValid(true);
        } else {
            handleIsContactValid(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityIndex, isEmailValid, values.fullName, values.phone]);
    // useEffect(() => {
    //     submittedCust.forEach(c => {
    //         const veg = c.selectedVeg.join();
    //         return { ...c, selectedVeg: veg };
    //     });
    //     console.log(submittedCust);
    // }, [submittedCust]);
    return (
        <Fragment>
            <section className="section section--review">
                <div className="section__item">
                    <h2 className="section__heading">Review Your Order</h2>
                    <p className="section__subheading">
                        Take a look at your orders and make sure that we have
                        everything you want and need!
                    </p>
                    <div className="grid-x grid-margin-x section__grid">
                        <div className="cell small-12 large-6">
                            <Table
                                customizations={customizations}
                                selectedPackage={selectedPackage}
                                goal={selectedGoal}
                                selectedDelivery={selectedDelivery}
                                deliveryOption={deliveryOption}
                                total={total}
                            />
                        </div>
                        <div className="cell small-12 large-6">
                            <Logistics
                                handleSelect={handleSelect}
                                shipping={shipping}
                                setDeliveryOption={setDeliveryOption}
                                deliveryOption={deliveryOption}
                                values={values}
                                handleChange={handleChange}
                                city={cityIndex}
                                setCity={setCityIndex}
                                email={email}
                                setEmail={handleEmail}
                                checkEmail={checkEmail}
                                isEmailValid={isEmailValid}
                                deliveryTime={deliveryTime}
                                setDeliveryTime={setDeliveryTime}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="section section--payment">
                <div className="section__item">
                    <h2 className="section__heading">Payment Option</h2>
                    <p className="section__subheading">
                        Unfortunately, we currently do not accept pre-payment
                        via credit card or debit card. Cash or e-Transfer only.
                    </p>
                    <div className="grid-x grid-margin-x section__grid align-center">
                        <div
                            className={
                                "card text-center small-12 medium-6 large-4 card__item card__item--title " +
                                (paymentOption === "cash"
                                    ? "card__item--active"
                                    : "")
                            }>
                            <div className="card-divider">{`Cash`}</div>
                            <div className="card-section">
                                <p>{`Paid on Day-Of`}</p>
                                <SplitButton
                                    handleClick={setPayment("cash")}
                                    text={
                                        paymentOption === "cash"
                                            ? "Selected"
                                            : "Select"
                                    }
                                    isActive={
                                        paymentOption === "cash" ? true : false
                                    }
                                />
                            </div>
                        </div>
                        <div
                            className={
                                "card text-center small-12 medium-6 large-4 card__item card__item--title " +
                                (paymentOption === "etransfer"
                                    ? "card__item--active"
                                    : "")
                            }>
                            <div className="card-divider">{`E-Transfer`}</div>
                            <div className="card-section">
                                <p>
                                    {`Paid to `}
                                    <a href="mailto:cheryl.almojuela@gmail.com">
                                        xxxx@xxx.com
                                    </a>
                                </p>
                                <SplitButton
                                    handleClick={setPayment("etransfer")}
                                    text={
                                        paymentOption === "etransfer"
                                            ? "Selected"
                                            : "Select"
                                    }
                                    isActive={
                                        paymentOption === "etransfer"
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <input type="hidden" name="" value={total} />
                <input
                    type="hidden"
                    name="customizations"
                    value={JSON.stringify(submittedCust)}
                />
                <input type="hidden" name="fullName" value={values.fullName} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="phone" value={values.phone} />
                <input type="hidden" name="address" />
                <input
                    type="hidden"
                    name="addressLine2"
                    value={values.address2}
                />
                <input type="hidden" name="city" />
                <input type="hidden" name="postalCode" />
                <input type="hidden" name="specialInstructions" />
            </section>
        </Fragment>
    );
};

export default Review;
