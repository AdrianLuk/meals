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
            meta,
            handleSelect,
            selectedPackage,
            selectedGoal
        } = this.props;
        const packageList = packages.map(packageItem => (
            <div
                style={{ display: "flex" }}
                onClick={handleSelect("selectedPackage", packageItem)}
                key={packageItem.id}>
                <div
                    style={{
                        color:
                            packageItem.id === selectedPackage.id
                                ? "red"
                                : "black"
                    }}>
                    {packageItem.title.rendered}
                </div>
                <div
                    style={{
                        color:
                            packageItem.id === selectedPackage.id
                                ? "red"
                                : "black"
                    }}>
                    {packageItem.acf.price}
                </div>
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
                <hr />
                <div>
                    {selectedPackage.title && selectedPackage.title.rendered}
                    <hr />
                    {selectedGoal.title && selectedGoal.title.rendered}
                </div>
                <hr />
                {goalList}
                {meta.packages && meta.packages.description}
            </Fragment>
        );
    }
}

export default Choose;
