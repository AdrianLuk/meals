import React, { Component } from "react";

export class Review extends Component {
    render() {
        const { customizations, selectedPackage, selectedGoal } = this.props;
        console.log(customizations);
        const customizationsTable = customizations.map((cust, index) => (
            <div key={index}>{cust.meatVariant}</div>
        ));
        return (
            <section className="section--review">
                <h1>Review Your Order</h1>
                {customizationsTable}
            </section>
        );
    }
}

export default Review;
