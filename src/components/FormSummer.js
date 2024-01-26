// This is now called Fitaxx Special
import React, { Component } from 'react';
import StepList from './steps/StepListSummer';
import Choose from './summer-steps/Choose';
import Customize from './summer-steps/Customize';
import Review from './summer-steps/Review';
import Pagination from './pagination/Pagination';
import Total from './TotalSummer';
import { SelectedPackageProvider } from '../contexts/SelectedPackage';
import axios from 'axios';
import { isEmptyObject } from './utils';
import { FormProvider } from '../contexts/Form';
import {
  ALLOWED_ADDONS,
  SUMMER_ADDONS_REMAINING,
  SUMMER_FALL_MENUS_REMAINING,
  SUMMER_PRICE,
} from './constants';

export class FormSummer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
      // users don't need to select package for fitaxx special menu so we start on step 2
      step: 2,
      isDataLoaded: false,
      types: {},
      packages: [],
      goals: [],
      fallMenu: [],
      winterMenu: [],
      selectedFallMenus: [],
      fallMenusRemaining: SUMMER_FALL_MENUS_REMAINING,
      salads: [],
      juices: [],
      snackSizes: [],
      snacks: [],
      selectedSnacks: [],
      addOns: [],
      addOnsRemaining: SUMMER_ADDONS_REMAINING,
      shippingOptions: null,
      selectedPackage: {},
      packageAmount: 1,
      selectedGoal: {},
      snacksRemaining: null,
      totalCustomizations: 0,
      currentCustomization: {},
      customizations: [],
      comments: '',
      selectedDeliveryLocation: 'default',
      deliveryOption: 'delivery',
      deliveryTime: '',
      deliveryDay: 'default',
      isContactValid: false,
      canProceed: false,
      total: SUMMER_PRICE,
      modalActive: true,
    };
    this.baseURL = this.props?.homeUrl || 'https://fitaxxmeals.com';
  }
  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps, prevState) {
    // if (prevState.step !== this.state.step) {
    //   this.handleProceed();
    // }
    if (prevState.addOns !== this.state.addOns) {
      this.setState({
        addOnsRemaining:
          SUMMER_ADDONS_REMAINING - +this.state.addOns.reduce((acc, curr) => acc + curr.count, 0),
      });
    }
    if (
      prevState.step !== this.state.step ||
      prevState.selectedDeliveryLocation !== this.state.selectedDeliveryLocation ||
      prevState.deliveryOption !== this.state.deliveryOption ||
      prevState.selectedFallMenus !== this.state.selectedFallMenus ||
      prevProps.discount !== this.props.discount
    ) {
      const total =
        SUMMER_PRICE +
        (this.state.selectedDeliveryLocation !== 'default' &&
        this.state.deliveryOption === 'delivery'
          ? +this.state.shippingOptions.delivery_locations[this.state.selectedDeliveryLocation]
              .price
          : 0) +
        (this.state.selectedFallMenus.length > 0
          ? this.state.selectedFallMenus.reduce(
              (acc, curr) => +curr.count * parseFloat(+curr.item?.acf?.extra_charge || 0) + +acc,
              0
            )
          : 0) -
        (!!this.props.discount ? +this.props?.discount?.discount_amount : 0);
      this.setState({ total });
      this.handleProceed();
    }
    if (prevState.selectedFallMenus !== this.state.selectedFallMenus) {
      this.setState({
        fallMenusRemaining:
          SUMMER_FALL_MENUS_REMAINING -
          +this.state.selectedFallMenus.reduce((acc, curr) => acc + curr.count, 0),
      });
    }
    if (
      prevState.addOnsRemaining !== this.state.addOnsRemaining ||
      prevState.fallMenusRemaining !== this.state.fallMenusRemaining
    ) {
      this.handleProceed();
    }
  }
  getData = async () => {
    const getTypes = await axios.get(`${this.baseURL}/wp-json/wp/v2/types`);
    const getPackages = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/packages?order=asc&per_page=100`
    );
    const getGoals = await axios.get(`${this.baseURL}/wp-json/wp/v2/goals?order=asc&per_page=100`);
    const getShippingOptions = await axios.get(`${this.baseURL}/wp-json/acf/v3/options/options`);
    const getSalads = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/salads?order=asc&per_page=100`
    );
    const getSnacks = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/snacks?order=asc&per_page=100`
    );
    const getSnackSizes = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/snack_sizes?order=asc&per_page=100`
    );
    const getFallMenu = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/fall_menu?order=asc&per_page=100`
    );
    const getWinterMenu = await axios.get(
      `${this.baseURL}/wp-json/wp/v2/winter_menu?order=asc&per_page=100`
    );
    const getJuices = await axios.get(`${this.baseURL}/wp-json/wp/v2/juice?order=asc&per_page=100`);
    Promise.all([
      getTypes,
      getPackages,
      getGoals,
      getShippingOptions,
      getSalads,
      getSnacks,
      getSnackSizes,
      getFallMenu,
      getWinterMenu,
      getJuices,
    ]).then(
      ([
        types,
        packages,
        goals,
        shippingOptions,
        salads,
        snacks,
        snackSizes,
        fallMenu,
        winterMenu,
        juices,
      ]) => {
        this.setState({
          types: types.data,
          packages: packages.data,
          goals: goals.data,
          shippingOptions: shippingOptions.data.acf,
          // deliveryTime: shippingOptions.data.acf.delivery_times[0].timeframe,
          deliveryTime: ``,
          salads: salads.data,
          snacks: snacks.data,
          snackSizes: snackSizes.data,
          fallMenu: fallMenu.data,
          winterMenu: winterMenu.data,
          juices: juices.data,
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
      if (this.state.fallMenusRemaining === 0) {
        // if user has no customizations left to customize, simply go to next step without saving
        this.setState({ step: this.state.step + 1 });
        this.scrollToTop();
      } else {
        // else do nothing
        return false;
      }
    } else {
      if (this.state.isContactValid) {
        this.setState({ isSubmitting: true });
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
        fallMenusRemaining: +selection.acf.meal_count,
      });
    }
  };
  handleFallMenuChange = (item, count) => {
    this.setState({
      selectedFallMenus: [
        ...this.state.selectedFallMenus.filter(
          (selectedFallMenu) => selectedFallMenu.item.id !== item.id
        ),
        { item, count },
      ]
        .filter((s) => s.count > 0)
        .sort((a, b) => a.item.id - b.item.id),
    });
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
  handleComments = (comments) => {
    this.setState({
      comments,
    });
  };
  handleProceed = () => {
    if (this.state.step === 2) {
      if (this.state.fallMenusRemaining === 0 && this.state.addOnsRemaining === 0) {
        this.setState({ canProceed: true });
      } else {
        this.setState({ canProceed: false });
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
  setDeliveryDay = (option) => {
    this.setState({ deliveryDay: option });
  };
  handleIsContactValid = (isValid) => {
    this.setState({ isContactValid: isValid });
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
            snacks={[
              ...this.state.snacks,
              //  ...this.state.juices
            ]}
            fallMenus={this.state.fallMenu}
          />
        );
      case 3:
        return (
          <Review
            fallMenus={this.state.selectedFallMenus}
            selectedPackage={this.state.selectedPackage}
            selectedGoal={this.state.selectedGoal}
            selectedDelivery={this.state.selectedDeliveryLocation}
            shipping={this.state.shippingOptions}
            handleSelect={this.handleDeliverySelect}
            deliveryOption={this.state.deliveryOption}
            setDeliveryOption={this.setDeliveryOption}
            deliveryTime={this.state.deliveryTime}
            setDeliveryTime={this.setDeliveryTime}
            deliveryDay={this.state.deliveryDay}
            setDeliveryDay={this.setDeliveryDay}
            total={this.state.total}
            isContactValid={this.state.isContactValid}
            handleIsContactValid={this.handleIsContactValid}
            handleProceed={this.handleProceed}
            addOns={this.state.addOns}
          />
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
      <FormProvider
        value={{
          baseURL: this.baseURL,
          handleSnackChange: this.handleSnackChange,
          snacksRemaining: this.state.addOnsRemaining,
          handleComments: this.handleComments,
          comments: this.state.comments,
          fallMenusRemaining: this.state.fallMenusRemaining,
          handleFallMenuChange: this.handleFallMenuChange,
          allowedAddons: ALLOWED_ADDONS,
          total: this.state.total,
          shippingOptions: this.state.shippingOptions,
          deliveryOption: this.state.deliveryOption,
          selectedDeliveryLocation: this.state.selectedDeliveryLocation,
        }}
      >
        <SelectedPackageProvider value={this.state?.selectedPackage}>
          <div className='form__header grid-container grid-x align-justify align-middle'>
            <StepList step={this.state.step} />
            <Total
              itemCount={+this.state?.selectedPackage?.acf?.meal_count}
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
        </SelectedPackageProvider>
      </FormProvider>
    );
  }
}

export default FormSummer;
