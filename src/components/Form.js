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
        customizationCount: 0,
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
    handleCustomizationAmountIncrement = event => {
        event.preventDefault();
        if (
            +this.state.customizationCount ===
            +this.state.selectedPackage.acf.meal_count
        ) {
            return false;
        }
        this.setState({
            customizationCount: +this.state.customizationCount + 1
        });
    };
    handleCustomizationAmountDecrement = event => {
        event.preventDefault();
        if (this.state.customizationCount === 0) {
            return false;
        }
        this.setState({
            customizationCount: +this.state.customizationCount - 1
        });
    };
    handlePackageSelect = selection => e => {
        e.preventDefault();
        console.log(selection);
        if (selection.acf) {
            this.setState({
                selectedPackage: selection,
                customizationCount: selection.acf.meal_count
            });
        }
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
                        handleSelect={this.handleSelect}
                        handlePackageSelect={this.handlePackageSelect}
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
                        customizations={this.state.customizations}
                        vegetables={this.state.vegetables}
                        customizationCount={this.state.customizationCount}
                        handleCustomizationAmountDecrement={
                            this.handleCustomizationAmountDecrement
                        }
                        handleCustomizationAmountIncrement={
                            this.handleCustomizationAmountIncrement
                        }
                        // handleSelect={this.handleSelect}
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
                        itemCount={+this.state.customizationCount}
                        packagePrice={this.state.selectedPackage}
                        selectedGoal={this.state.selectedGoal.id}
                    />
                </div>
            </Fragment>
        );
    }
}

export default Form;
