import React, { Component, Fragment } from "react";
// import axios from "axios";

export class Choose extends Component {
    state = {
        packages: []
        // selectedPackage: null
    };

    render() {
        console.log(this.props);
        const {
            packages,
            goals,
            handleSelect,
            selectedPackage,
            selectedGoal
        } = this.props;
        const packageList = packages.map(packageItem => (
            <div
                style={{ display: "flex" }}
                onClick={handleSelect("selectedPackage", packageItem)}
                key={packageItem.id}>
                <div>{packageItem.title.rendered}</div>
                <div>{packageItem.acf.price}</div>
            </div>
        ));
        const goalList = goals.map(goal => (
            <div onClick={handleSelect("selectedGoal", goal)} key={goal.id}>
                <div>{goal.title.rendered}</div>
                <div
                    dangerouslySetInnerHTML={{ __html: goal.excerpt.rendered }}
                />
            </div>
        ));
        return (
            <Fragment>
                {packageList}
                <div>
                    {selectedPackage.title && selectedPackage.title.rendered}
                    {selectedGoal.title && selectedGoal.title.rendered}
                </div>
                {goalList}
            </Fragment>
        );
    }
}

export default Choose;
