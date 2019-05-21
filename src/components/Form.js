import React, { Component, Fragment } from "react";
import Choose from "./form-sections/Choose";
import Customize from "./form-sections/Customize";
import Review from "./form-sections/Review";
import Total from "./Total";
import axios from "axios";

export class Form extends Component {
    state = {
        types: {},
        packages: [],
        goals: [],
        carbs: [],
        meats: [],
        vegetables: [],
        selectedPackage: {},
        packageAmount: 1,
        selectedGoal: {},
        selectedCarb: {},
        selectedMeat: {},
        selectedVegetable: {},
        carbVariant: null,
        meatVariant: null,
        vegetableVariant: null,
        customizationCount: null,
        customizations: []
    };
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const getTypes = await axios.get("/wp-json/wp/v2/types");
        const getPackages = await axios.get(
            "/wp-json/wp/v2/packages?order=asc"
        );
        const getGoals = await axios.get("/wp-json/wp/v2/goals?order=asc");
        const getCarbs = await axios.get("/wp-json/wp/v2/carbs?order=asc");
        const getMeats = await axios.get("/wp-json/wp/v2/meats?order=asc");
        const getVegetables = await axios.get(
            "/wp-json/wp/v2/vegetables?order=asc"
        );

        Promise.all([
            getTypes,
            getPackages,
            getGoals,
            getCarbs,
            getMeats,
            getVegetables
        ]).then(res => {
            this.setState({
                types: res[0].data,
                packages: res[1].data,
                goals: res[2].data,
                carbs: res[3].data,
                meats: res[4].data,
                vegetables: res[5].data
            });
        });
        // console.log(this.state.packages);
        // console.log(this.state.goals);
        // console.log(this.state.carbs);
    };
    // Handle fields change
    // handleChange = input => e => {
    //     this.setState({ [input]: e.target.value });
    // };
    handlePackageAmountIncrement = event => {
        event.preventDefault();
        this.setState({ packageAmount: this.state.packageAmount + 1 });
    };
    handlePackageAmountDecrement = event => {
        event.preventDefault();
        if (this.state.packageAmount === 0) {
            return false;
        }
        this.setState({ packageAmount: this.state.packageAmount - 1 });
    };
    handleSelect = (state, selection) => e => {
        e.preventDefault();
        console.log(selection);
        this.setState({ [state]: selection });
    };

    renderSections = () => {
        const { step } = this.props;
        if (!step) {
            return <div>Loading</div>;
        }
        switch (step) {
            case 1:
                return (
                    <Choose
                        meta={this.state.types}
                        packages={this.state.packages}
                        goals={this.state.goals}
                        packageAmount={this.state.packageAmount}
                        handlePackageAmountDecrement={
                            this.handlePackageAmountDecrement
                        }
                        handlePackageAmountIncrement={
                            this.handlePackageAmountIncrement
                        }
                        handleSelect={this.handleSelect}
                        selectedPackage={this.state.selectedPackage}
                        selectedGoal={this.state.selectedGoal}
                    />
                );
            case 2:
                return (
                    <Customize
                        meta={this.state.types}
                        carbs={this.state.carbs}
                        meats={this.state.meats}
                        vegetables={this.state.vegetables}
                        handleSelect={this.handleSelect}
                    />
                );
            case 3:
                return <Review />;
            default:
                return <div>Loading</div>;
        }
    };
    render() {
        return (
            <Fragment>
                <div className="grid-container">
                    {this.renderSections()}
                    <Total
                        itemCount={this.state.packageAmount}
                        packagePrice={this.state.selectedPackage}
                        selectedGoal={this.state.selectedGoal.id}
                    />
                </div>
            </Fragment>
        );
    }
}

export default Form;
