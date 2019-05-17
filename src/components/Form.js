import React, { Component } from "react";
import Choose from "./form-sections/Choose";
import Customize from "./form-sections/Customize";
import Review from "./form-sections/Review";
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
        selectedGoal: {},
        selectedCarb: {},
        selectedMeat: {},
        selectedVegetable: {}
    };
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const getTypes = await axios.get("/wp-json/wp/v2/types");
        const getPackages = await axios.get("/wp-json/wp/v2/packages");
        const getGoals = await axios.get("/wp-json/wp/v2/goals");
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
    handleSelect = (state, selection) => e => {
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
        return this.renderSections();
    }
}

export default Form;
