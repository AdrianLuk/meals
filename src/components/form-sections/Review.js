import React, { Component } from "react";
import Table from "../Table";
import "./section.scss";

export class Review extends Component {
    render() {
        const { customizations, selectedPackage, selectedGoal } = this.props;
        // console.log(customizations, selectedPackage, selectedGoal);
        // const customizationsTable = customizations.map((cust, index) => (
        //     <div key={index}>{cust.meatVariant}</div>
        // ));
        return (
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
                            />
                        </div>
                        <div className="cell small-12 large-6" />
                    </div>
                </div>
            </section>
        );
    }
}

export default Review;
