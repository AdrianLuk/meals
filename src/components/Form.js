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
        carbs: []
    };
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const getTypes = await axios.get("/wp-json/wp/v2/types");
        const getPackages = await axios.get("/wp-json/wp/v2/packages");
        const getGoals = await axios.get("/wp-json/wp/v2/goals");

        Promise.all([getTypes, getPackages, getGoals]).then(res => {
            this.setState({
                types: res[0].data,
                packages: res[1].data,
                goals: res[2].data
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
                    />
                );
            case 2:
                return (
                    <Customize
                        meta={this.state.types}
                        goals={this.state.goals}
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
