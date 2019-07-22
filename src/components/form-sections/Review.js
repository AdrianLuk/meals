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
    deliveryOption,
    setDeliveryOption,
    deliveryTime,
    setDeliveryTime,
    total,
    isContactValid,
    handleIsContactValid,
    handleProceed
}) => {
    let [submittedCust, setSubmittedCust] = useState(customizations);
    const [paymentOption, setPaymentOption] = useState("cash");
    const setPayment = option => e => {
        e.preventDefault();
        setPaymentOption(option);
    };
    // const [cityIndex, setCityIndex] = useState("");
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
        const replacer = (key, value) =>
            value === null || value.length === 0 ? "none" : value; // specify how you want to handle null values here
        const header = Object.keys(customizations[0]);
        let csv = customizations.map(row => {
            // console.log(row);
            return header
                .map(fieldName =>
                    JSON.stringify(`${fieldName} : ${row[fieldName]}`, replacer)
                )
                .join(", ");
        });
        csv = csv.join("\r\n\r\n");
        // console.log(csv);
        setSubmittedCust(csv);
        // console.log(customizations);
        // console.log(submittedCust);
    }, [customizations, submittedCust]);

    useEffect(() => {
        setCityValue(shipping.delivery_locations[+selectedDelivery]);
        // console.log(cityValue);
        return setCityValue(shipping.delivery_locations[+selectedDelivery]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityValue, selectedDelivery]);

    useEffect(() => {
        if (deliveryOption === "delivery") {
            if (
                selectedDelivery !== "default" &&
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
            if (
                selectedDelivery !== "default" &&
                values.fullName.length > 0 &&
                values.phone.length > 0 &&
                isEmailValid
            ) {
                handleIsContactValid(true);
            } else {
                handleIsContactValid(false);
            }
        }
        handleProceed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        deliveryOption,
        selectedDelivery,
        isEmailValid,
        values.address,
        values.fullName,
        values.phone
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
                                shipping={shipping}
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
                                city={
                                    selectedDelivery === "default"
                                        ? "default"
                                        : selectedDelivery
                                }
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
                            onClick={setPayment("cash")}
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
                            onClick={setPayment("etransfer")}
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

                <input type="hidden" name="1" value={values.fullName} />
                <input
                    type="hidden"
                    name="2"
                    value={selectedPackage.title.rendered}
                />
                <input
                    type="hidden"
                    name="3"
                    value={selectedGoal.title.rendered}
                />
                <input type="hidden" name="5" value={total} />
                <input type="hidden" name="6" value={deliveryOption} />
                <input type="hidden" name="7" value={deliveryTime} />
                <input type="hidden" name="8" value={paymentOption} />
                <input type="hidden" name="9" value={email} />
                <input type="hidden" name="10" value={values.phone} />
                <input type="hidden" name="11" value={values.address} />
                <input type="hidden" name="12" value={values.address2} />
                <input
                    type="hidden"
                    name="13"
                    value={cityValue ? cityValue.location : ""}
                />
                <input type="hidden" name="14" value={values.postalCode} />
                <input
                    type="hidden"
                    name="15"
                    value={values.specialInstructions}
                />
                <input type="hidden" name="16" value={submittedCust} />
            </section>
        </Fragment>
    );
};

export default Review;
