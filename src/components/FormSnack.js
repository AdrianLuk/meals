import React, { Component } from "react";
import StepList from "./steps/StepList";
import Choose from "./snack-steps/Choose";
import Customize from "./snack-steps/Customize";
import Review from "./snack-steps/Review";
import Pagination from "./pagination/Pagination";
import Total from "./TotalSnack";
import { SelectedPackageProvider } from "../contexts/SelectedPackage";
import axios from "axios";
import { FormProvider } from "../contexts/Form";

export class FormSnack extends Component {
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
            salads: [],
            snackSizes: [],
            snacks: [],
            selectedSnacks: [],
            shippingOptions: null,
            selectedPackage: {},
            packageAmount: 1,
            selectedGoal: {},
            currentCustomizationCount: 1,
            currentCustomizationId: 1,
            customizationsRemaining: null,
            snacksRemaining: null,
            totalCustomizations: 0,
            currentCustomization: {},
            customizations: [],
            comments: "",
            selectedDeliveryLocation: "default",
            deliveryOption: "delivery",
            deliveryTime: "",
            isContactValid: false,
            canProceed: false,
            total: null,
        };
        this.baseURL = "https://fitaxxmeals.com";
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.selectedPackage !== this.state.selectedPackage ||
            prevState.step !== this.state.step
        ) {
            this.handleProceed();
        }
        if (
            prevState.selectedPackage !== this.state.selectedPackage ||
            prevState.step !== this.state.step ||
            prevState.selectedDeliveryLocation !==
                this.state.selectedDeliveryLocation ||
            prevState.deliveryOption !== this.state.deliveryOption
        ) {
            const total = +this.state.selectedPackage?.acf?.price;
            this.setState({ total });
        }
        if (prevState.selectedSnacks !== this.state.selectedSnacks) {
            this.setState({
                snacksRemaining:
                    +this.state.selectedPackage?.acf?.size -
                    +this.state.selectedSnacks.reduce(
                        (acc, curr) => acc + curr.count,
                        0
                    ),
            });
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
        const getSalads = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/salads?order=asc`
        );
        const getSnackSizes = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/snack_sizes?order=asc`
        );
        const getSnacks = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/snacks?order=asc`
        );
        Promise.all([
            getTypes,
            getPackages,
            getGoals,
            getCarbs,
            getMeats,
            getVegetables,
            getShippingOptions,
            getSalads,
            getSnackSizes,
            getSnacks,
        ]).then(res => {
            this.setState({
                types: res[0].data,
                packages: res[1].data,
                goals: res[2].data,
                carbs: res[3].data,
                meats: res[4].data,
                vegetables: res[5].data,
                shippingOptions: res[6].data.acf,
                deliveryTime: res[6].data.acf.delivery_times[0].timeframe,
                salads: res[7].data,
                snackSizes: res[8].data,
                snacks: res[9].data,
                isDataLoaded: true,
            });
        });
        // console.log(this.state.salads);
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
            if (this.isEmptyObject(this.state.selectedPackage)) {
            } else {
                this.setState({ step: this.state.step + 1 });
                this.scrollToTop();
            }
        } else if (this.state.step === 2) {
            // this.addCustomizationToOrder();
            if (this.state.snacksRemaining === 0) {
                // if user has no customizations left to customize, simply go to next step without saving
                this.setState({ step: this.state.step + 1 });
            } else {
                // else do nothing
                return false;
            }
        } else {
            if (this.state.isContactValid) {
                document.getElementById("order-form").submit();
            }
        }
    };
    handlePackageSelect = selection => e => {
        e.preventDefault();
        // console.log(selection);
        if (selection.acf) {
            this.setState({
                selectedPackage: selection,
                snacksRemaining: +selection.acf.size,
            });
        }
    };
    handleSnackChange = (snack, count) => {
        this.setState({
            selectedSnacks: [
                ...this.state.selectedSnacks.filter(
                    selectedSnack => selectedSnack.snack.id !== snack.id
                ),
                { snack, count },
            ]
                .filter(s => s.count > 0)
                .sort((a, b) => a.snack.id - b.snack.id),
        });
    };
    handleComments = comments => {
        this.setState({
            comments,
        });
    };
    handleProceed = () => {
        if (this.state.step === 1) {
            if (!this.isEmptyObject(this.state.selectedPackage)) {
                this.setState({ canProceed: true });
                // return true;
            } else {
                this.setState({ canProceed: false });
                // return false;
            }
        }
    };
    handleSelect = (state, selection) => e => {
        e.preventDefault();
        // console.log(selection);
        this.setState({ [state]: selection });
    };
    handleDeliverySelect = selected => {
        this.setState({ selectedDeliveryLocation: selected });
    };
    setDeliveryOption = option => e => {
        e.preventDefault();
        this.setState({ deliveryOption: option });
    };
    setDeliveryTime = option => e => {
        e.preventDefault();
        this.setState({ deliveryTime: option });
    };
    handleIsContactValid = isValid => {
        this.setState({ isContactValid: isValid });
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
                        packages={this.state.snackSizes}
                        // goals={this.state.goals}
                        // handleSelect={this.handleSelect}
                        handlePackageSelect={this.handlePackageSelect}
                        selectedPackage={this.state.selectedPackage}
                        // selectedGoal={this.state.selectedGoal}
                    />
                );
            case 2:
                return (
                    <Customize
                        snacks={this.state.snacks}
                        salads={this.state.salads}
                    />
                );
            case 3:
                return (
                    <Review
                        snacks={this.state.selectedSnacks}
                        selectedPackage={this.state.selectedPackage}
                        selectedDelivery={this.state.selectedDeliveryLocation}
                        shipping={this.state.shippingOptions}
                        handleSelect={this.handleDeliverySelect}
                        deliveryOption={this.state.deliveryOption}
                        setDeliveryOption={this.setDeliveryOption}
                        deliveryTime={this.state.deliveryTime}
                        setDeliveryTime={this.setDeliveryTime}
                        total={this.state.total}
                        isContactValid={this.state.isContactValid}
                        handleIsContactValid={this.handleIsContactValid}
                        handleProceed={this.handleProceed}
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
            <FormProvider
                value={{
                    handleSnackChange: this.handleSnackChange,
                    snacksRemaining: this.state.snacksRemaining,
                    handleComments: this.handleComments,
                    comments: this.state.comments,
                }}>
                <SelectedPackageProvider value={this.state?.selectedPackage}>
                    <div className="form__header grid-container grid-x align-justify align-middle">
                        <StepList step={this.state.step} />
                        <Total
                            step={this.state.step}
                            itemCount={+this.state?.selectedPackage?.acf?.size}
                            packagePrice={this.state.selectedPackage}
                            selectedGoal={this.state.selectedGoal}
                            selectedDelivery={
                                this.state.selectedDeliveryLocation
                            }
                            deliveryOption={this.state.deliveryOption}
                            totalCustomizations={this.state.totalCustomizations}
                            customizationsRemaining={
                                this.state.customizationsRemaining
                            }
                            total={this.state.total}
                        />
                    </div>
                    <div className="grid-container">
                        {this.renderSections()}
                    </div>
                    <Pagination
                        canProceed={this.state.canProceed}
                        handleNextStepChange={this.handleNextStepChange}
                        handlePrevStepChange={this.handlePrevStepChange}
                        step={this.state.step}
                    />
                </SelectedPackageProvider>
            </FormProvider>
        );
    }
}

export default FormSnack;
