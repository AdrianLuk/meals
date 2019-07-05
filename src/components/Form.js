import React, { Component, Fragment } from "react";
import StepList from "./steps/StepList";
import Choose from "./form-sections/Choose";
import Pagination from "./pagination/Pagination";
import Customize from "./form-sections/Customize";
import Review from "./form-sections/Review";
import Total from "./Total";
import axios from "axios";

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            isDataLoaded: false,
            types: {},
            packages: [],
            goals: [],
            carbs: [],
            meats: [],
            vegetables: [],
            shippingOptions: null,
            selectedPackage: {},
            packageAmount: 1,
            selectedGoal: {},
            currentCustomizationCount: 1,
            currentCustomizationId: 1,
            customizationsRemaining: null,
            totalCustomizations: 0,
            currentCustomization: {},
            customizations: [],
            comments: "",
            selectedDeliveryLocation: {},
            deliveryOption: "delivery"
        };
        this.baseURL = "https://almojuela.com/fitaxxmeals";
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedPackage.id !== this.state.selectedPackage.id) {
            this.setState({ customizations: [] });
        }
    }
    getData = async () => {
        const getTypes = await axios.get(`${this.baseURL}/wp-json/wp/v2/types`);
        const getPackages = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/packages?order=asc`
        );
        const getGoals = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/goals?order=asc`
        );
        const getCarbs = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/carbs?order=asc`
        );
        const getMeats = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/meats?order=asc`
        );
        const getVegetables = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/vegetables?order=asc`
        );
        const getShippingOptions = await axios.get(
            `${this.baseURL}/wp-json/acf/v3/options/options`
        );
        Promise.all([
            getTypes,
            getPackages,
            getGoals,
            getCarbs,
            getMeats,
            getVegetables,
            getShippingOptions
        ]).then(res => {
            this.setState({
                types: res[0].data,
                packages: res[1].data,
                goals: res[2].data,
                carbs: res[3].data,
                meats: res[4].data,
                vegetables: res[5].data,
                shippingOptions: res[6].data.acf,
                isDataLoaded: true
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
    scrollToTop = () => {
        document
            .getElementById("form-anchor")
            .scrollIntoView({ behavior: "smooth", block: "start" });
    };
    isEmptyObject = object => {
        if (
            Object.entries(object).length === 0 &&
            object.constructor === Object
        ) {
            return true;
        } else {
            return false;
        }
    };
    handlePrevStepChange = event => {
        event.preventDefault();
        this.setState({ step: this.state.step - 1 });
    };
    handleNextStepChange = event => {
        event.preventDefault();
        if (this.state.step === 1) {
            if (
                this.isEmptyObject(this.state.selectedPackage) ||
                this.isEmptyObject(this.state.selectedGoal)
            ) {
            } else {
                this.setState({ step: this.state.step + 1 });
                this.scrollToTop();
            }
        } else if (this.state.step === 2) {
            // this.addCustomizationToOrder();
            if (this.state.customizationsRemaining > 0) {
                this.saveCustomization(this.state.currentCustomization);
            }
            if (
                this.state.customizationsRemaining -
                    this.state.currentCustomizationCount >
                0
            ) {
                this.setState({
                    step: 2,
                    currentCustomization: {},
                    currentCustomizationId:
                        this.state.currentCustomizationId + 1
                });
                this.scrollToTop();
            } else {
                this.setState({ step: this.state.step + 1 });
                this.scrollToTop();
            }
        } else {
            console.log("submit");
            document.getElementById("order-form").submit();
            this.scrollToTop();
        }
    };
    addCustomizationToOrder = customization => {
        console.log(customization);
        // const customizations = [...this.state.customizations, customization];
        // console.log(customizations);
        // this.saveCustomization(customizations);
        this.setState({ currentCustomization: customization });
    };
    saveCustomization = customization => {
        const customizations = [...this.state.customizations, customization];
        this.setState({
            customizations: customizations,
            currentCustomization: {},
            // currentCustomizationCount:
            //     this.state.customizationsRemaining -
            //     this.state.currentCustomizationCount,
            currentCustomizationCount: 1,
            customizationsRemaining:
                this.state.customizationsRemaining -
                this.state.currentCustomizationCount
        });
    };
    handleCustomizationAmountIncrement = event => {
        event.preventDefault();
        if (
            +this.state.currentCustomizationCount >=
            +this.state.customizationsRemaining
        ) {
            this.setState({
                currentCustomizationCount: +this.state.customizationsRemaining
            });
        } else {
            this.setState({
                currentCustomizationCount:
                    +this.state.currentCustomizationCount + 1
            });
        }
    };
    handleCustomizationAmountChange = e => {
        if (e.target.value > +this.state.customizationsRemaining) {
            this.setState({
                currentCustomizationCount: +this.state.customizationsRemaining
            });
        }
        this.setState({ currentCustomizationCount: e.target.value });
    };
    handleCustomizationAmountDecrement = event => {
        event.preventDefault();
        if (this.state.currentCustomizationCount <= 1) {
            return false;
        }
        this.setState({
            currentCustomizationCount: +this.state.currentCustomizationCount - 1
        });
    };
    handlePackageSelect = selection => e => {
        e.preventDefault();
        console.log(selection);
        if (selection.acf) {
            this.setState({
                selectedPackage: selection,
                // currentCustomizationCount: +selection.acf.meal_count,
                currentCustomizationCount: 1,
                totalCustomizations: +selection.acf.meal_count,
                customizationsRemaining: +selection.acf.meal_count
            });
        }
    };
    handleSelect = (state, selection) => e => {
        e.preventDefault();
        console.log(selection);
        this.setState({ [state]: selection });
    };
    handleDeliverySelect = selected => {
        this.setState({ selectedDeliveryLocation: selected });
    };
    setDeliveryOption = option => e => {
        e.preventDefault();
        this.setState({ deliveryOption: option });
    };
    renderSections = () => {
        const { step } = this.state;
        if (!step) {
            return (
                <div className="spinner-container">
                    <span className="spinner fa fa-spin fa-spinner fa-3x fa-fw" />
                </div>
            );
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
                        currentCustomizationId={
                            this.state.currentCustomizationId
                        }
                        customizationCount={
                            this.state.currentCustomizationCount
                        }
                        handleCustomizationAmountDecrement={
                            this.handleCustomizationAmountDecrement
                        }
                        handleCustomizationAmountChange={
                            this.handleCustomizationAmountChange
                        }
                        handleCustomizationAmountIncrement={
                            this.handleCustomizationAmountIncrement
                        }
                        addToOrder={this.addCustomizationToOrder}
                        customizationsRemaining={
                            this.state.customizationsRemaining
                        }
                    />
                );
            case 3:
                return (
                    <Review
                        customizations={this.state.customizations}
                        selectedPackage={this.state.selectedPackage}
                        selectedGoal={this.state.selectedGoal}
                        selectedDelivery={this.state.selectedDeliveryLocation}
                        shipping={this.state.shippingOptions}
                        handleSelect={this.handleDeliverySelect}
                        deliveryOption={this.state.deliveryOption}
                        setDeliveryOption={this.setDeliveryOption}
                    />
                );
            default:
                return (
                    <div className="spinner-container">
                        <span className="spinner fa fa-spin fa-spinner fa-3x fa-fw" />
                    </div>
                );
        }
    };
    render() {
        if (!this.state.isDataLoaded) {
            return (
                <div className="spinner-container">
                    <span className="spinner fa fa-spin fa-spinner fa-3x fa-fw" />
                </div>
            );
        }
        return (
            <Fragment>
                <div className="form__header grid-container grid-x align-justify align-middle">
                    <StepList step={this.state.step} />
                    <Total
                        step={this.state.step}
                        itemCount={+this.state.totalCustomizations}
                        packagePrice={this.state.selectedPackage}
                        selectedGoal={this.state.selectedGoal}
                        selectedDelivery={this.state.selectedDeliveryLocation}
                        deliveryOption={this.state.deliveryOption}
                        totalCustomizations={this.state.totalCustomizations}
                        customizationsRemaining={
                            this.state.customizationsRemaining
                        }
                    />
                </div>
                <div className="grid-container">{this.renderSections()}</div>
                <Pagination
                    canProceed={
                        !this.isEmptyObject(this.state.selectedPackage) &&
                        !this.isEmptyObject(this.state.selectedGoal)
                    }
                    handleNextStepChange={this.handleNextStepChange}
                    handlePrevStepChange={this.handlePrevStepChange}
                    step={this.state.step}
                />
            </Fragment>
        );
    }
}

export default Form;
