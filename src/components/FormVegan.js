import React, { Component } from "react";
import StepList from "./steps/StepList";
import Choose from "./vegan-steps/Choose";
import Customize from "./vegan-steps/Customize";
import Review from "./vegan-steps/Review";
import Pagination from "./pagination/Pagination";
import Total from "./TotalSnack";
import { SelectedPackageProvider } from "../contexts/SelectedPackage";
import axios from "axios";
import { isEmptyObject } from "./utils";
import { FormProvider } from "../contexts/Form";
import { ALLOWED_ADDONS, ADDON_PRICE } from "./constants";
import Popup from "./Popup";

export class FormVegan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            isDataLoaded: false,
            types: {},
            packages: [],
            goals: [],
            vegans: [],
            selectedVegans: [],
            vegansRemaining: null,
            salads: [],
            snackSizes: [],
            snacks: [],
            selectedSnacks: [],
            addOns: [],
            addOnsRemaining: ALLOWED_ADDONS,
            shippingOptions: null,
            selectedPackage: {},
            packageAmount: 1,
            selectedGoal: {},
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
            modalActive: true,
        };
        this.baseURL = this.props?.homeUrl || "https://fitaxxmeals.com";
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
        if (prevState.addOns !== this.state.addOns) {
            this.setState({
                addOnsRemaining:
                    ALLOWED_ADDONS -
                    +this.state.addOns.reduce(
                        (acc, curr) => acc + curr.count,
                        0
                    ),
            });
        }
        if (
            prevState.selectedPackage !== this.state.selectedPackage ||
            prevState.selectedGoal !== this.state.selectedGoal ||
            prevState.step !== this.state.step ||
            prevState.selectedDeliveryLocation !==
                this.state.selectedDeliveryLocation ||
            prevState.deliveryOption !== this.state.deliveryOption ||
            prevState.addOns !== this.state.addOns
        ) {
            const total =
                +this.state.selectedPackage?.acf?.price +
                (this.state.selectedGoal.acf && this.state.selectedPackage.acf
                    ? +this.state.selectedPackage.acf.meal_count *
                      +this.state.selectedGoal.acf.portion_price
                    : 0) +
                (this.state.selectedDeliveryLocation !== "default" &&
                this.state.deliveryOption === "delivery"
                    ? +this.state.shippingOptions.delivery_locations[
                          this.state.selectedDeliveryLocation
                      ].price
                    : 0) +
                (this.state.addOns.length > 0
                    ? this.state.addOns.reduce(
                          (acc, curr) => acc + curr.count,
                          0
                      ) * ADDON_PRICE
                    : 0);
            this.setState({ total });
        }
        if (prevState.selectedVegans !== this.state.selectedVegans) {
            this.setState({
                vegansRemaining:
                    +this.state.selectedPackage?.acf?.meal_count -
                    +this.state.selectedVegans.reduce(
                        (acc, curr) => acc + curr.count,
                        0
                    ),
            });
        }
    }
    getData = async () => {
        const getTypes = await axios.get(`${this.baseURL}/wp-json/wp/v2/types`);
        const getPackages = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/packages?order=asc&per_page=100`
        );
        const getGoals = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/goals?order=asc&per_page=100`
        );
        const getShippingOptions = await axios.get(
            `${this.baseURL}/wp-json/acf/v3/options/options`
        );
        const getSalads = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/salads?order=asc&per_page=100`
        );
        const getSnacks = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/snacks?order=asc&per_page=100`
        );
        const getSnackSizes = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/snack_sizes?order=asc&per_page=100`
        );
        const getVegans = await axios.get(
            `${this.baseURL}/wp-json/wp/v2/vegan?order=asc&per_page=100`
        );
        Promise.all([
            getTypes,
            getPackages,
            getGoals,
            getShippingOptions,
            getSalads,
            getSnacks,
            getSnackSizes,
            getVegans,
        ]).then(
            ([
                types,
                packages,
                goals,
                shippingOptions,
                salads,
                snacks,
                snackSizes,
                vegans,
            ]) => {
                this.setState({
                    types: types.data,
                    packages: packages.data,
                    goals: goals.data,
                    shippingOptions: shippingOptions.data.acf,
                    deliveryTime:
                        shippingOptions.data.acf.delivery_times[0].timeframe,
                    salads: salads.data,
                    snacks: snacks.data,
                    snackSizes: snackSizes.data,
                    vegans: vegans.data,
                    isDataLoaded: true,
                });
            }
        );
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

    handlePrevStepChange = event => {
        event.preventDefault();
        this.setState({ step: this.state.step - 1 });
    };
    handleNextStepChange = event => {
        event.preventDefault();
        if (this.state.step === 1) {
            if (
                isEmptyObject(this.state.selectedPackage) ||
                isEmptyObject(this.state.selectedGoal)
            ) {
            } else {
                this.setState({ step: this.state.step + 1 });
                this.scrollToTop();
            }
        } else if (this.state.step === 2) {
            // this.addCustomizationToOrder();
            if (this.state.vegansRemaining === 0) {
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
                vegansRemaining: +selection.acf.meal_count,
            });
        }
    };
    handleVeganChange = (vegan, count) => {
        this.setState({
            selectedVegans: [
                ...this.state.selectedVegans.filter(
                    selectedVegan => selectedVegan.vegan.id !== vegan.id
                ),
                { vegan, count },
            ]
                .filter(s => s.count > 0)
                .sort((a, b) => a.vegan.id - b.vegan.id),
        });
    };
    handleSnackChange = (snack, count) => {
        this.setState({
            addOns: [
                ...this.state.addOns.filter(
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
            if (!isEmptyObject(this.state.selectedPackage)) {
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
    toggleModal = e => {
        e.preventDefault();
        this.setState({ modalActive: !this.state.modalActive });
    };
    handleNoThanks = e => {
        e.preventDefault();
        this.setState({
            modalActive: !this.state.modalActive,
            addOnsRemaining: 14,
            addOns: [],
        });
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
                        // snacks={this.state.snacks}
                        // salads={[...this.state.salads, ...this.state.snacks]}
                        vegans={this.state.vegans}
                    />
                );
            case 3:
                return (
                    <>
                        <Review
                            vegans={this.state.selectedVegans}
                            selectedPackage={this.state.selectedPackage}
                            selectedGoal={this.state.selectedGoal}
                            selectedDelivery={
                                this.state.selectedDeliveryLocation
                            }
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
                            addOns={this.state.addOns}
                        />
                        <Popup
                            salads={[
                                ...this.state.salads,
                                ...this.state.snacks,
                            ]}
                            active={this.state.modalActive}
                            toggleModal={this.toggleModal}
                            handleNoThanks={this.handleNoThanks}
                        />
                    </>
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
                    snacksRemaining: this.state.addOnsRemaining,
                    handleComments: this.handleComments,
                    comments: this.state.comments,
                    vegansRemaining: this.state.vegansRemaining,
                    handleVeganChange: this.handleVeganChange,
                    allowedAddons: ALLOWED_ADDONS,
                }}>
                <SelectedPackageProvider value={this.state?.selectedPackage}>
                    <div className="form__header grid-container grid-x align-justify align-middle">
                        <StepList step={this.state.step} />
                        <Total
                            itemCount={
                                +this.state?.selectedPackage?.acf?.meal_count
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

export default FormVegan;
