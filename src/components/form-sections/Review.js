import React, { useState, Fragment } from "react";
import Table from "../table/Table";
import Logistics from "../logistics/Logistics";
// import CardItem from "../cards/CardItem_Title";
import SplitButton from "../SplitButton";
import "./section.scss";

const Review = ({
    customizations,
    selectedPackage,
    selectedGoal,
    shipping,
    handleSelect,
    selectedDelivery,
    setDeliveryOption,
    deliveryOption
}) => {
    const [paymentOption, setPaymentOption] = useState("cash");
    const setPayment = option => e => {
        e.preventDefault();
        setPaymentOption(option);
    };
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
                            />
                        </div>
                        <div className="cell small-12 large-6">
                            <Logistics
                                handleSelect={handleSelect}
                                shipping={shipping}
                                setDeliveryOption={setDeliveryOption}
                                deliveryOption={deliveryOption}
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
                                <p>{`Paid to `}</p>
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
            </section>
        </Fragment>
    );
};

export default Review;
