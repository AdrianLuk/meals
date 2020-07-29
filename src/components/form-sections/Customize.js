import React, { useState, useEffect } from "react";
import CardList from "../cards/CardList";
import "./section.scss";
import { isEmptyObject } from "../utils";
const CARBS = "carbs";
const SALADS = "salads";

const Customize = ({
    carbs,
    meats,
    vegetables,
    salads,
    customizationCount,
    addToOrder,
    currentCustomizationId,
    // customizations,
    customizationsRemaining,
    handleCustomizationAmountIncrement,
    handleCustomizationAmountChange,
    handleCustomizationAmountDecrement,
}) => {
    // eslint-disable-next-line no-unused-vars
    const [customizationId, setCustomizationId] = useState(1);
    const [selectedCarb, setSelectedCarb] = useState({});
    const [carbVariant, setCarbVariant] = useState({});
    const [selectedMeat, setSelectedMeat] = useState({});
    const [meatVariant, setMeatVariant] = useState({});
    const [selectedVeg, setSelectedVeg] = useState({});
    const [comments, setComments] = useState("");
    const [custTotal, setCustTotal] = useState(0);
    // init object containing all the data for the current customization
    let customization = {
        customization_number: currentCustomizationId,
        customization_quantity: customizationCount,
        // selectedMeat,
        meat: meatVariant,
        // selectedCarb,
        carb: selectedCarb.type === CARBS ? carbVariant : selectedCarb,
        vegetable: selectedCarb.type === CARBS ? selectedVeg : {},
        comments,
        customization_price: custTotal,
    };
    useEffect(() => {
        setCustTotal(
            (carbVariant?.extra_charge
                ? +carbVariant.extra_charge * customizationCount
                : 0) +
                (meatVariant?.extra_charge
                    ? +meatVariant.extra_charge * customizationCount
                    : 0) +
                (selectedVeg && selectedVeg.acf && selectedVeg.acf.extra_charge
                    ? +selectedVeg.acf.extra_charge * customizationCount
                    : 0)
        );
    }, [
        selectedCarb,
        carbVariant,
        selectedMeat,
        meatVariant,
        selectedVeg,
        customizationCount,
    ]);

    useEffect(() => {
        // console.log(customization);
        addToOrder(customization);
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        customizationId,
        selectedMeat,
        meatVariant,
        selectedCarb,
        carbVariant,
        selectedVeg,
        customizationCount,
        custTotal,
        comments,
    ]);
    useEffect(() => {
        setSelectedMeat({});
        setMeatVariant({});
        setSelectedCarb({});
        setCarbVariant({});
        setSelectedVeg({});
        setComments("");
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
                            className="button hollow circle">
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
                            className="button hollow circle">
                            <i className="fa fa-plus" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
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
                        selectedVariant={meatVariant}
                        // variantKey="meatVariant"
                        handleSelect={setSelectedVeg}
                        // setVariant={setMeatVariant}
                        groups={vegetables}
                        hasNone={false}
                    />
                </>
            )}
            {/*<div className="section__item">
                <h2 className="section__heading">Select Your Vegetables</h2>
                <p className="section__subheading">
                    Select as many vegetable options as you'd like
                </p>
                <div className="section__grid grid-x grid-margin-x align-center">
                    {vegetables &&
                        vegetables.map(veg => (
                            <div
                                className={
                                    "card small-12 medium-6 large-4 card__item card__item--picture " +
                                    (selectedVeg.includes(veg.post_title)
                                        ? "card__item--active"
                                        : "")
                                }
                                key={veg.id}>
                                {veg.thumbnail && (
                                    <div
                                        onClick={handleVegClick(veg.post_title)}
                                        className="card-img"
                                        style={{
                                            backgroundImage: `url(${veg.thumbnail})`
                                        }}
                                    />
                                )}
                                <div className="card-divider">
                                    {veg.post_title}
                                </div>
                                <div className="card-section">
                                    <button
                                        onClick={handleVegClick(veg.post_title)}
                                        className={
                                            "input-group select-button "
                                        }>
                                        <span className="input-group-field select-button__text">
                                            {selectedVeg.includes(
                                                veg.post_title
                                            )
                                                ? "Selected"
                                                : "Select"}
                                        </span>
                                        <span
                                            className={
                                                "input-group-label select-button__icon fa " +
                                                (selectedVeg.includes(
                                                    veg.post_title
                                                )
                                                    ? "fa-check"
                                                    : "fa-arrow-right")
                                            }
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
                </div>*/}
            <hr />
            <div className="section__item">
                <h3 className="section__heading">Comments</h3>
                <p className="section__subheading">
                    <strong>We also serve halal meat!</strong> Please add any
                    comments for this customization
                </p>
                <p className="section__subheading">
                    <em>
                        Please Note: Items in salad can be removed but not
                        substituted. For more information,{" "}
                        <a
                            href={`${window.location.href}frequently-asked-questions`}>
                            click here
                        </a>
                    </em>
                </p>
                <div className="customize__textarea-container">
                    <textarea
                        className="customize__textarea"
                        value={comments}
                        onChange={e => setComments(e.target.value)}
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
