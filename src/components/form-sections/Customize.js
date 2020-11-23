import React, { useState, useEffect, useContext, useMemo } from 'react';
import CardList from '../cards/CardList';
import './section.scss';
import { isEmptyObject } from '../utils';
import FormContext from '../../contexts/Form';
const CARBS = 'carbs';
const SALADS = 'salads';
// const FALL_MENU = 'fall_menu';

const Customize = ({
  carbs,
  meats,
  vegetables,
  salads,
  fallMenu,
  customizationCount,
  addToOrder,
  currentCustomizationId,
  // customizations,
  customizationsRemaining,
  handleCustomizationAmountIncrement,
  handleCustomizationAmountChange,
  handleCustomizationAmountDecrement,
}) => {
  const [selectedCarb, setSelectedCarb] = useState({});
  const [carbVariant, setCarbVariant] = useState({});
  const [selectedMeat, setSelectedMeat] = useState({});
  const [meatVariant, setMeatVariant] = useState({});
  const [selectedVeg, setSelectedVeg] = useState({});
  const [comments, setComments] = useState('');
  const [custTotal, setCustTotal] = useState(0);
  const [selectedFallMenu, setSelectedFallMenu] = useState({});
  const formContext = useContext(FormContext);
  // init object containing all the data for the current customization
  const customization = useMemo(() => {
    return {
      customization_number: currentCustomizationId,
      customization_quantity: customizationCount,
      fall_menu: selectedFallMenu,
      // selectedMeat,
      meat:
        isEmptyObject(selectedFallMenu) && !isEmptyObject(selectedMeat)
          ? meatVariant
          : {},
      // selectedCarb,
      carb: selectedCarb.type === CARBS ? carbVariant : selectedCarb,
      vegetable: selectedCarb.type === CARBS ? selectedVeg : {},
      comments,
      customization_price: custTotal,
    };
  }, [
    carbVariant,
    comments,
    currentCustomizationId,
    custTotal,
    customizationCount,
    meatVariant,
    selectedCarb,
    selectedFallMenu,
    selectedMeat,
    selectedVeg,
  ]);
  useEffect(() => {
    let total = 0;
    if (isEmptyObject(selectedFallMenu)) {
      total =
        (carbVariant?.extra_charge
          ? +carbVariant.extra_charge * customizationCount
          : 0) +
        (meatVariant?.extra_charge
          ? +meatVariant.extra_charge * customizationCount
          : 0) +
        (selectedCarb?.type !== SALADS && selectedVeg?.acf?.extra_charge
          ? +selectedVeg.acf.extra_charge * customizationCount
          : 0);
    } else {
      total = selectedFallMenu?.acf?.extra_charge
        ? +selectedFallMenu.acf.extra_charge * customizationCount
        : 0;
    }
    setCustTotal(total);
  }, [
    selectedCarb,
    carbVariant,
    selectedMeat,
    meatVariant,
    selectedVeg,
    selectedFallMenu,
    customizationCount,
  ]);

  useEffect(() => {
    // console.log(customization);
    addToOrder(customization);
    return () => {};
  }, [
    currentCustomizationId,
    selectedMeat,
    meatVariant,
    selectedCarb,
    carbVariant,
    selectedVeg,
    selectedFallMenu,
    customizationCount,
    custTotal,
    comments,
    addToOrder,
    customization,
  ]);
  useEffect(() => {
    setSelectedMeat({});
    setMeatVariant({});
    setSelectedCarb({});
    setCarbVariant({});
    setSelectedVeg({});
    setSelectedFallMenu({});
    setComments('');
    setCustTotal(0);
  }, [currentCustomizationId]);
  // const handleVegClick = selectedVeggie => e => {
  //     e.preventDefault();
  //     // console.log(selectedVeggie);
  //     const alreadySelected = selectedVeg.includes(selectedVeggie);
  //     if (alreadySelected) {
  //         const vegList = selectedVeg.filter(veg => veg !== selectedVeggie);
  //         setSelectedVeg(vegList);
  //     } else {
  //         const vegList = [...selectedVeg, selectedVeggie];
  //         setSelectedVeg(vegList);
  //     }
  // };
  return (
    <section className="section section--customize">
      <div className="customize__counter">
        <h5 className="section__heading text-center">
          Choose number of meals for this customization
        </h5>
        <div className="input-group plus-minus-input align-center">
          <div className="input-group-button">
            <button
              onClick={handleCustomizationAmountDecrement}
              type="button"
              className="button hollow circle"
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </button>
          </div>
          <input
            type="number"
            value={
              customizationCount > customizationsRemaining
                ? customizationsRemaining
                : customizationCount
            }
            onChange={handleCustomizationAmountChange}
            className="input-group-field"
            max={customizationsRemaining}
          />
          <div className="input-group-button">
            <button
              onClick={handleCustomizationAmountIncrement}
              type="button"
              className="button hollow circle"
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {isEmptyObject(selectedMeat) &&
        isEmptyObject(selectedCarb) &&
        isEmptyObject(selectedVeg) && (
          <CardList
            groupName="fall menu"
            stateKey="selectedFallMenu"
            heading={`Our fall menu`}
            headingColor={`orange`}
            subheading={`Try our limited edition fall menu! No substitutions allowed.`}
            selected={selectedFallMenu}
            handleSelect={setSelectedFallMenu}
            groups={fallMenu}
            hasNone={false}
          />
        )}
      {isEmptyObject(selectedFallMenu) && (
        <>
          <hr />
          <CardList
            groupName="carb"
            stateKey="selectedCarb"
            selected={selectedCarb}
            selectedVariant={carbVariant}
            variantKey="carbVariant"
            handleSelect={setSelectedCarb}
            setVariant={setCarbVariant}
            groups={[...carbs, ...salads]}
            hasNone={true}
          />
          <hr />
          <CardList
            groupName="meat"
            stateKey="selectedMeat"
            selected={selectedMeat}
            // selectedVariant={meatVariant}
            variantKey="meatVariant"
            handleSelect={setSelectedMeat}
            setVariant={setMeatVariant}
            groups={meats}
            hasNone={false}
          />
          {(isEmptyObject(selectedCarb) || selectedCarb.type !== SALADS) && (
            <>
              <hr />
              <CardList
                groupName="vegetable"
                stateKey="selectedVeg"
                selected={selectedVeg}
                // selectedVariant={meatVariant}
                // variantKey="meatVariant"
                handleSelect={setSelectedVeg}
                // setVariant={setMeatVariant}
                groups={vegetables}
                hasNone={false}
              />
            </>
          )}
          <hr />
        </>
      )}
      <div className="section__item">
        <h3 className="section__heading">Comments</h3>
        <p className="section__subheading">
          <strong>We also serve halal meat!</strong> Please add any comments for
          this customization
        </p>
        <p className="section__subheading">
          <em>
            Please Note: Items in salad can be removed but not substituted. For
            more information,{' '}
            <a href={`${formContext.baseURL}/frequently-asked-questions`}>
              click here
            </a>
          </em>
        </p>
        <div className="customize__textarea-container">
          <textarea
            className="customize__textarea"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            name=""
            id=""
            rows={4}
          />
        </div>
      </div>
    </section>
  );
};

export default Customize;
