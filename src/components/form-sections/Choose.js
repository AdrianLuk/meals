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
            selectedGoal,
            handlePackageSelect
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
                buttonText="Select"
                group="packages"
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
                description={goal.excerpt.rendered}
                buttonText="Select"
            />
        ));
        return (
            <Fragment>
                <div>
                    <p>{meta.packages && meta.packages.description}</p>
                    <div className="grid-x grid-margin-x align-justify">
                        {packageList}
                    </div>
                </div>
                <hr />
                <div>
                    <div className="grid-x grid-margin-x align-justify">
                        {goalList}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Choose;
