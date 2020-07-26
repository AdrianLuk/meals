import React, { Component } from "react";
import CardItem from "../cards/CardItem_Title";
import "./section.scss";
// import axios from "axios";

export class Choose extends Component {
    state = {
        packages: [],
        // selectedPackage: null
    };

    render() {
        // console.log(this.props);
        const {
            packages,
            goals,
            handleSelect,
            selectedPackage,
            selectedGoal,
            handlePackageSelect,
            // packageAmount
        } = this.props;
        const packageList = packages.map(packageItem => (
            <CardItem
                key={packageItem.id}
                item={packageItem}
                stateKey="selectedPackage"
                selectedItem={selectedPackage}
                handleSelect={handlePackageSelect}
                handlePackageSelect={handlePackageSelect}
                buttonText={`$${packageItem.acf.price}`}
                description={`${packageItem.acf.meal_count} Personal Sized Meals`}
                group="packages"
                cardTitle={packageItem.title.rendered}
            />
        ));
        const goalList = goals.map(goal => (
            <CardItem
                key={goal.id}
                item={goal}
                group="goals"
                selectedItem={selectedGoal}
                handleSelect={handleSelect}
                stateKey="selectedGoal"
                description={goal.acf.portion_description}
                buttonText={
                    parseInt(goal.acf.portion_price) > 0
                        ? `$${parseInt(goal.acf.portion_price).toFixed(2)}`
                        : `FREE`
                }
                cardTitle={goal.acf.portion_goal}
            />
        ));
        return (
            <section className="section section--choose">
                <div className="section__item">
                    <h2 className="section__heading">Select a Package</h2>
                    <p className="section__subheading">
                        Choose how many meals you intend to eat per day for six
                        (6) days.
                    </p>
                    <div className="section__grid grid-x grid-margin-x align-large-justify align-spaced">
                        {packageList}
                    </div>
                </div>
                <hr />
                <div className="section__item">
                    <h2 className="section__heading">Select Your Goal</h2>
                    <p className="section__subheading">
                        We have 3 sizes for you to choose from: 4oz, 6oz, and
                        8oz (+$1), to help you lose, maintain, and gain weight.
                    </p>
                    <div className="section__grid grid-x grid-margin-x align-large-justify align-spaced">
                        {goalList}
                    </div>
                </div>
            </section>
        );
    }
}

export default Choose;
