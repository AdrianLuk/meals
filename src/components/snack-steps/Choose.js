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
            // handleSelect,
            selectedPackage,
            // selectedGoal,
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
                buttonText={`$${parseFloat(packageItem.acf.price).toFixed(2)}`}
                description={`${packageItem.acf.size} Snacks`}
                group="packages"
                cardTitle={packageItem.title.rendered}
            />
        ));
        return (
            <section className="section section--choose">
                <div className="section__item">
                    <h2 className="section__heading">Select Snack Package</h2>
                    <p className="section__subheading">
                        Choose how many snacks you would like.
                    </p>
                    <div className="section__grid grid-x grid-margin-x align-large-justify align-spaced">
                        {packageList}
                    </div>
                </div>
            </section>
        );
    }
}

export default Choose;
