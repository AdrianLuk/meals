import React, { Component } from 'react';
import StepList from './steps/StepList';
import Choose from './juice-steps/Choose';
import Customize from './juice-steps/Customize';
import Review from './juice-steps/Review';
import Pagination from './pagination/Pagination';
import Total from './TotalJuice';
import { SelectedPackageProvider } from '../contexts/SelectedPackage';
import axios from 'axios';
import { FormProvider } from '../contexts/Form';

export class FormJuice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      isDataLoaded: false,
      types: {},
      packages: [],
      goals: [],
      salads: [],
      juiceSizes: [],
      juices: [],
      selectedJuices: [],
      shippingOptions: null,
      selectedPackage: {},
      packageAmount: 1,
      selectedGoal: {},
      currentCustomizationCount: 1,
      currentCustomizationId: 1,
      customizationsRemaining: null,
      juicesRemaining: null,
      totalCustomizations: 0,
      currentCustomization: {},
      customizations: [],
      comments: '',
      selectedDeliveryLocation: 'default',
      deliveryOption: 'delivery',
      deliveryTime: '',
      isContactValid: false,
      canProceed: false,
      total: null,
    };
    this.baseURL = this.props?.homeUrl || 'https://fitaxxmeals.com';
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
      const total =
        +this.state.selectedPackage?.acf?.price +
        (this.state.selectedDeliveryLocation !== 'default' &&
        this.state.deliveryOption === 'delivery'
          ? +this.state.shippingOptions.delivery_locations[
              this.state.selectedDeliveryLocation
            ].price
          : 0);
      this.setState({ total });
    }
    if (prevState.selectedJuices !== this.state.selectedJuices) {
      this.setState({
        juicesRemaining:
          +this.state.selectedPackage?.acf?.size -
          +this.state.selectedJuices.reduce((acc, curr) => acc + curr.count, 0),
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
    const getJuices = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/juice?order=asc&per_page=100`
    );
    const getJuiceSizes = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/juice_size?order=desc&per_page=100`
    );
    Promise.all([
      getTypes,
      getPackages,
      getGoals,
      getShippingOptions,
      getSalads,
      getJuices,
      getJuiceSizes,
    ]).then(
      ([
        types,
        packages,
        goals,
        shippingOptions,
        salads,
        juices,
        juiceSizes,
      ]) => {
        this.setState({
          types: types.data,
          packages: packages.data,
          goals: goals.data,
          shippingOptions: shippingOptions.data.acf,
          // deliveryTime: shippingOptions.data.acf.delivery_times[0].timeframe,
          deliveryTime: ``,
          salads: salads.data,
          juices: juices.data,
          juiceSizes: juiceSizes.data,
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
      .getElementById('form-anchor')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  isEmptyObject = (object) => {
    if (Object.entries(object).length === 0 && object.constructor === Object) {
      return true;
    } else {
      return false;
    }
  };
  handlePrevStepChange = (event) => {
    event.preventDefault();
    this.setState({ step: this.state.step - 1 });
  };
  handleNextStepChange = (event) => {
    event.preventDefault();
    if (this.state.step === 1) {
      if (this.isEmptyObject(this.state.selectedPackage)) {
      } else {
        this.setState({ step: this.state.step + 1 });
        this.scrollToTop();
      }
    } else if (this.state.step === 2) {
      // this.addCustomizationToOrder();
      if (this.state.juicesRemaining === 0) {
        // if user has no customizations left to customize, simply go to next step without saving
        this.setState({ step: this.state.step + 1 });
      } else {
        // else do nothing
        return false;
      }
    } else {
      if (this.state.isContactValid) {
        document.getElementById('order-form').submit();
      }
    }
  };
  handlePackageSelect = (selection) => (e) => {
    e.preventDefault();
    // console.log(selection);
    if (selection.acf) {
      this.setState({
        selectedPackage: selection,
        juicesRemaining: +selection.acf.size,
      });
    }
  };
  handleJuiceChange = (juice, count) => {
    this.setState({
      selectedJuices: [
        ...this.state.selectedJuices.filter(
          (selectedJuice) => selectedJuice.juice.id !== juice.id
        ),
        { juice, count },
      ]
        .filter((s) => s.count > 0)
        .sort((a, b) => a.juice.id - b.juice.id),
    });
  };
  handleComments = (comments) => {
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
  handleSelect = (state, selection) => (e) => {
    e.preventDefault();
    // console.log(selection);
    this.setState({ [state]: selection });
  };
  handleDeliverySelect = (selected) => {
    this.setState({ selectedDeliveryLocation: selected });
  };
  setDeliveryOption = (option) => (e) => {
    e.preventDefault();
    this.setState({ deliveryOption: option });
  };
  setDeliveryTime = (option) => (e) => {
    e.preventDefault();
    this.setState({ deliveryTime: option });
  };
  handleIsContactValid = (isValid) => {
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
            packages={this.state.juiceSizes}
            // goals={this.state.goals}
            // handleSelect={this.handleSelect}
            handlePackageSelect={this.handlePackageSelect}
            selectedPackage={this.state.selectedPackage}
            // selectedGoal={this.state.selectedGoal}
          />
        );
      case 2:
        return <Customize juices={this.state.juices} />;
      case 3:
        return (
          <Review
            juices={this.state.selectedJuices}
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
          baseURL: this.baseURL,
          handleJuiceChange: this.handleJuiceChange,
          juicesRemaining: this.state.juicesRemaining,
          handleComments: this.handleComments,
          comments: this.state.comments,
          selectedJuices: this.state.selectedJuices,
        }}
      >
        <SelectedPackageProvider value={this.state?.selectedPackage}>
          <div className="form__header grid-container grid-x align-justify align-middle">
            <StepList step={this.state.step} />
            <Total
              itemCount={+this.state?.selectedPackage?.acf?.size}
              total={this.state.total}
            />
          </div>
          <div className="grid-container">{this.renderSections()}</div>
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

export default FormJuice;
