import React, { Component, Fragment } from "react";
import CardItem from "../CardItem_Title";
// import axios from "axios";

export class Choose extends Component {
    state = {
        packages: []
        // selectedPackage: null
    };

    render() {
        // console.log(this.props);
        const {
            packages,
            goals,
            meta,
            handleSelect,
            selectedPackage,
            handlePackageAmountIncrement,
            handlePackageAmountDecrement,
            selectedGoal,
            packageAmount
        } = this.props;
        const packageList = packages.map(packageItem => (
            <CardItem
                key={packageItem.id}
                item={packageItem}
                stateKey="selectedPackage"
                selectedItem={selectedPackage}
                handleSelect={handleSelect}
                buttonText="Select"
            />
        ));
        const goalList = goals.map(goal => (
            <CardItem
                key={goal.id}
                item={goal}
                selectedItem={selectedGoal}
                handleSelect={handleSelect}
                stateKey="selectedGoal"
                description={goal.excerpt.rendered}
                buttonText="Select"
            />
        ));
        return (
            <Fragment>
                <article>
                    <p>{meta.packages && meta.packages.description}</p>
                    <div className="grid-x grid-margin-x align-justify">
                        {packageList}
                    </div>
                </article>
                <hr />
                <div>
                    <span onClick={handlePackageAmountDecrement}> - </span>
                    <span onClick={handlePackageAmountIncrement}> + </span>
                </div>
                <div>
                    {selectedPackage.title && selectedPackage.title.rendered}
                    <hr />
                    {selectedGoal.title && selectedGoal.title.rendered}
                </div>
                <article>
                    <div className="grid-x grid-margin-x align-justify">
                        {goalList}
                    </div>
                </article>
            </Fragment>
        );
    }
}

export default Choose;
