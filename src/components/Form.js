import React, { Component, Fragment } from 'react';
import StepList from './steps/StepList';
import Choose from './form-sections/Choose';
import Pagination from './pagination/Pagination';
import Customize from './form-sections/Customize';
import Review from './form-sections/Review';
import Total from './Total';
import axios from 'axios';
import { isEmptyObject } from './utils';
import { NO_CARB, ALLOWED_ADDONS, ADDON_PRICE } from './constants';
import { FormProvider } from '../contexts/Form';
import Popup from './Popup';

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      step: 1,
      isDataLoaded: false,
      types: {},
      packages: [],
      goals: [],
      carbs: [],
      meats: [],
      vegetables: [],
      salads: [],
      juices: [],
      snacks: [],
      smoothies: [],
      fallMenu: [],
      addOns: [],
      addOnsRemaining: ALLOWED_ADDONS,
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
      comments: '',
      selectedDeliveryLocation: 'default',
      deliveryOption: 'delivery',
      deliveryTime: '',
      isContactValid: false,
      canProceed: false,
      total: null,
      modalActive: true,
    };
    this.baseURL = this.props?.homeUrl || 'https://fitaxxmeals.com';
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedPackage.id !== this.state.selectedPackage.id) {
      this.setState({ customizations: [] });
    }
    if (
      prevState.selectedPackage !== this.state.selectedPackage ||
      prevState.selectedGoal !== this.state.selectedGoal ||
      prevState.step !== this.state.step
    ) {
      this.handleProceed();
    }
    if (prevState.currentCustomization !== this.state.currentCustomization) {
      this.handleProceed();
    }
    if (prevState.addOns !== this.state.addOns) {
      this.setState({
        addOnsRemaining:
          ALLOWED_ADDONS - +this.state.addOns.reduce((acc, curr) => acc + curr.count, 0),
      });
    }
    if (
      prevState.selectedPackage !== this.state.selectedPackage ||
      prevState.selectedGoal !== this.state.selectedGoal ||
      prevState.currentCustomization !== this.state.currentCustomization ||
      prevState.step !== this.state.step ||
      prevState.selectedDeliveryLocation !== this.state.selectedDeliveryLocation ||
      prevState.deliveryOption !== this.state.deliveryOption ||
      prevState.addOns !== this.state.addOns ||
      prevProps.discount !== this.props.discount
    ) {
      const total =
        +this.state.selectedPackage?.acf?.price +
        (this.state.selectedGoal.acf && this.state.selectedPackage.acf
          ? +this.state.selectedPackage.acf.meal_count * +this.state.selectedGoal.acf.portion_price
          : 0) +
        (this.state.selectedDeliveryLocation !== 'default' &&
        this.state.deliveryOption === 'delivery'
          ? +this.state.shippingOptions.delivery_locations[this.state.selectedDeliveryLocation]
              .price
          : 0) +
        (this.state.currentCustomization.carb !== NO_CARB &&
        this.state.currentCustomization?.carb?.extra_charge
          ? +this.state.currentCustomization.carb.extra_charge *
            +this.state.currentCustomization.customization_quantity
          : 0) +
        (this.state.currentCustomization?.meat?.extra_charge
          ? +this.state.currentCustomization.meat.extra_charge *
            +this.state.currentCustomization.customization_quantity
          : 0) +
        (this.state.currentCustomization?.vegetable?.acf?.extra_charge
          ? +this.state.currentCustomization.vegetable.acf.extra_charge *
            +this.state.currentCustomization.customization_quantity
          : 0) +
        (this.state.currentCustomization?.fall_menu?.acf?.extra_charge
          ? +this.state.currentCustomization.fall_menu.acf.extra_charge *
            +this.state.currentCustomization.customization_quantity
          : 0) +
        this.state.customizations.reduce(
          (total, current) => total + current.customization_price,
          0
        ) +
        (this.state.addOns.length > 0
          ? this.state.addOns.reduce(
              (acc, curr) =>
                +curr.count * (parseFloat(+curr.snack?.acf?.extra_charge || 0) + ADDON_PRICE) +
                +acc,
              0
            )
          : 0) -
        (!!this.props.discount ? +this.props?.discount?.discount_amount : 0);
      this.setState({ total: total });
    }
  }
  getData = async () => {
    const getTypes = await axios.get(`${this.baseURL}/wp-json/wp/v2/types`);
    const getPackages = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/packages?order=asc&per_page=100`
    );
    const getGoals = await axios.get(`${this.baseURL}/wp-json/wp/v2/goals?order=asc&per_page=100`);
    const getCarbs = await axios.get(`${this.baseURL}/wp-json/wp/v2/carbs?order=asc&per_page=100`);
    const getMeats = await axios.get(`${this.baseURL}/wp-json/wp/v2/meats?order=asc&per_page=100`);
    const getVegetables = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/vegetables?order=asc&per_page=100`
    );
    const getShippingOptions = await axios.get(`${this.baseURL}/wp-json/acf/v3/options/options`);
    const getSalads = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/salads?order=asc&per_page=100`
    );
    const getSnacks = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/snacks?order=asc&per_page=100`
    );
    const getFallMenu = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/fall_menu?order=asc&per_page=100`
    );
    const getJuices = await axios.get(`${this.baseURL}/wp-json/wp/v2/juice?order=asc&per_page=100`);
    const getSmoothies = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/smoothie?order=asc&per_page=100`
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
      getSnacks,
      getFallMenu,
      getJuices,
      getSmoothies,
    ]).then(
      ([
        types,
        packages,
        goals,
        carbs,
        meats,
        vegetables,
        shippingOptions,
        salads,
        snacks,
        fallMenu,
        juices,
        smoothies,
      ]) => {
        this.setState({
          types: types.data,
          packages: packages.data,
          goals: goals.data,
          carbs: carbs.data,
          meats: meats.data,
          vegetables: vegetables.data,
          shippingOptions: shippingOptions.data.acf,
          // deliveryTime: shippingOptions.data.acf.delivery_times[0].timeframe,
          deliveryTime: ``,
          salads: salads.data,
          snacks: snacks.data,
          fallMenu: fallMenu.data,
          juices: juices.data,
          smoothies: smoothies.data,
          isDataLoaded: true,
        });
      }
    );
    // console.log(this.state.packages);
    // console.log(this.state.goals);
    // console.log(this.state.carbs);
  };
  // Handle fields change
  // handleChange = input => e => {
  //     this.setState({ [input]: e.target.value });
  // };
  scrollToTop = () => {
    document.getElementById('form-anchor').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  handlePrevStepChange = (event) => {
    event.preventDefault();
    this.setState({
      step: this.state.step - 1,
      // only works because modal is shown right before the last step...needs refactor if any steps added after review
      modalActive: true,
      isSubmitting: false,
    });
  };
  handleNextStepChange = (event) => {
    event.preventDefault();
    if (this.state.step === 1) {
      if (isEmptyObject(this.state.selectedPackage) || isEmptyObject(this.state.selectedGoal)) {
      } else {
        this.setState({ step: this.state.step + 1 });
        this.scrollToTop();
      }
    } else if (this.state.step === 2) {
      // this.addCustomizationToOrder();
      // save customization if valid and have customizations left to customize
      if (
        this.state.customizationsRemaining > 0 &&
        isEmptyObject(this.state.currentCustomization.carb) &&
        isEmptyObject(this.state.currentCustomization.meat) &&
        !isEmptyObject(this.state.currentCustomization.fall_menu)
      ) {
        this.saveCustomization(this.state.currentCustomization);
      } else if (
        this.state.customizationsRemaining > 0 &&
        !isEmptyObject(this.state.currentCustomization.carb) &&
        !isEmptyObject(this.state.currentCustomization.meat) &&
        isEmptyObject(this.state.currentCustomization.fall_menu)
      ) {
        this.saveCustomization(this.state.currentCustomization);
      } else if (this.state.customizationsRemaining === 0) {
        // if user has no customizations left to customize, simply go to next step without saving
        this.setState({ step: this.state.step + 1 });
      } else {
        // else do nothing
        return false;
      }
      // else {
      //     this.setState({ step: this.state.step + 1 });
      //     this.scrollToTop();
      // }
      if (this.state.customizationsRemaining - this.state.currentCustomizationCount > 0) {
        this.setState({
          step: 2,
          currentCustomization: {},
          currentCustomizationId: this.state.currentCustomizationId + 1,
        });
        this.scrollToTop();
      } else {
        this.setState({ step: this.state.step + 1 });
        this.scrollToTop();
      }
    } else {
      if (this.state.isContactValid) {
        this.setState({ isSubmitting: true });
        document.getElementById('order-form').submit();
      }
    }
  };
  addCustomizationToOrder = (customization) => {
    // console.log(customization);
    // const customizations = [...this.state.customizations, customization];
    // console.log(customizations);
    // this.saveCustomization(customizations);
    this.setState({ currentCustomization: customization });
  };
  saveCustomization = (customization) => {
    const customizations = [...this.state.customizations, customization];
    this.setState({
      customizations: customizations,
      currentCustomization: {},
      // currentCustomizationCount:
      //     this.state.customizationsRemaining -
      //     this.state.currentCustomizationCount,
      currentCustomizationCount: 1,
      customizationsRemaining:
        this.state.customizationsRemaining - this.state.currentCustomizationCount,
    });
  };
  handleCustomizationAmountDecrement = (event) => {
    event.preventDefault();
    if (this.state.currentCustomizationCount <= 1) {
      return false;
    } else {
      this.setState({
        currentCustomizationCount: +this.state.currentCustomizationCount - 1,
      });
    }
  };
  handleCustomizationAmountChange = (e) => {
    if (e.target.value > +this.state.customizationsRemaining) {
      this.setState({
        currentCustomizationCount: +this.state.customizationsRemaining,
      });
    } else {
      this.setState({ currentCustomizationCount: +e.target.value });
    }
  };
  handleCustomizationAmountIncrement = (event) => {
    event.preventDefault();
    if (+this.state.currentCustomizationCount >= +this.state.customizationsRemaining) {
      this.setState({
        currentCustomizationCount: +this.state.customizationsRemaining,
      });
    } else {
      this.setState({
        currentCustomizationCount: +this.state.currentCustomizationCount + 1,
      });
    }
  };
  handlePackageSelect = (selection) => (e) => {
    e.preventDefault();
    // console.log(selection);
    if (selection.acf) {
      this.setState({
        selectedPackage: selection,
        // currentCustomizationCount: +selection.acf.meal_count,
        currentCustomizationCount: 1,
        totalCustomizations: +selection.acf.meal_count,
        customizationsRemaining: +selection.acf.meal_count,
      });
    }
  };
  handleProceed = () => {
    if (this.state.step === 1) {
      if (!isEmptyObject(this.state.selectedPackage) && !isEmptyObject(this.state.selectedGoal)) {
        this.setState({ canProceed: true });
        // return true;
      } else {
        this.setState({ canProceed: false });
        // return false;
      }
    }
    // if (this.state.step === 2) {
    //     if (
    //         this.state.currentCustomization.carb &&
    //         this.state.currentCustomization.meat
    //     ) {
    //         if (
    //             this.state.currentCustomization.carb.length > 0 &&
    //             this.state.currentCustomization.meat.length > 0
    //         ) {
    //             this.setState({ canProceed: true });
    //             // return true;
    //         } else {
    //             this.setState({ canProceed: false });
    //             // return false;
    //         }
    //     }
    //     if (this.state.customizationsRemaining === 0) {
    //         this.setState({ canProceed: true });
    //     }
    // }
    // if (this.state.step === 3) {
    //     if (this.state.isContactValid) {
    //         this.setState({ canProceed: true });
    //     } else {
    //         this.setState({ canProceed: false });
    //     }
    // }
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
  handleSnackChange = (snack, count) => {
    this.setState({
      addOns: [
        ...this.state.addOns.filter((selectedSnack) => selectedSnack.snack.id !== snack.id),
        { snack, count },
      ]
        .filter((s) => s.count > 0)
        .sort((a, b) => a.snack.id - b.snack.id),
    });
  };
  toggleModal = (e) => {
    e.preventDefault();
    this.setState({ modalActive: !this.state.modalActive });
  };
  handleNoThanks = (e) => {
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
        <div className='spinner-container'>
          <span className='spinner fa fa-spin fa-spinner fa-3x fa-fw' />
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
            fallMenu={this.state.fallMenu}
            customizations={this.state.customizations}
            vegetables={this.state.vegetables}
            salads={this.state.salads}
            currentCustomizationId={this.state.currentCustomizationId}
            customizationCount={this.state.currentCustomizationCount}
            handleCustomizationAmountDecrement={this.handleCustomizationAmountDecrement}
            handleCustomizationAmountChange={this.handleCustomizationAmountChange}
            handleCustomizationAmountIncrement={this.handleCustomizationAmountIncrement}
            addToOrder={this.addCustomizationToOrder}
            customizationsRemaining={this.state.customizationsRemaining}
          />
        );
      case 3:
        return (
          <>
            <Review
              customizations={this.state.customizations}
              selectedPackage={this.state.selectedPackage}
              selectedGoal={this.state.selectedGoal}
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
              addOns={this.state.addOns}
            />
            <Popup
              items={[
                ...this.state.smoothies,
                ...this.state.salads,
                ...this.state.snacks,
                // ...this.state.juices,
              ]}
              active={this.state.modalActive}
              toggleModal={this.toggleModal}
              handleNoThanks={this.handleNoThanks}
            />
          </>
        );
      default:
        return (
          <div className='spinner-container'>
            <span className='spinner fa fa-spin fa-spinner fa-3x fa-fw' />
          </div>
        );
    }
  };
  render() {
    if (!this.state.isDataLoaded) {
      return (
        <div className='spinner-container'>
          <span className='spinner fa fa-spin fa-spinner fa-3x fa-fw' />
        </div>
      );
    }
    return (
      <Fragment>
        <FormProvider
          value={{
            baseURL: this.baseURL,
            handleSnackChange: this.handleSnackChange,
            snacksRemaining: this.state.addOnsRemaining,
            allowedAddons: ALLOWED_ADDONS,
            total: this.state.total,
            shippingOptions: this.state.shippingOptions,
            deliveryOption: this.state.deliveryOption,
            selectedDeliveryLocation: this.state.selectedDeliveryLocation,
          }}
        >
          <div className='form__header grid-container grid-x align-justify align-middle'>
            <StepList step={this.state.step} />
            <Total
              step={this.state.step}
              itemCount={+this.state.totalCustomizations}
              packagePrice={this.state.selectedPackage}
              selectedGoal={this.state.selectedGoal}
              selectedDelivery={this.state.selectedDeliveryLocation}
              deliveryOption={this.state.deliveryOption}
              totalCustomizations={this.state.totalCustomizations}
              customizationsRemaining={this.state.customizationsRemaining}
              total={this.state.total}
            />
          </div>
          <div className='grid-container'>{this.renderSections()}</div>
          <Pagination
            isSubmitting={this.state.isSubmitting}
            canProceed={this.state.canProceed}
            handleNextStepChange={this.handleNextStepChange}
            handlePrevStepChange={this.handlePrevStepChange}
            step={this.state.step}
          />
        </FormProvider>
      </Fragment>
    );
  }
}

export default Form;
