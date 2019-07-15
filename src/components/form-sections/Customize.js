import React, { useState, useEffect } from "react";
import CardList from "../cards/CardList";
import "./section.scss";

const Customize = ({
    carbs,
    meats,
    vegetables,
    customizationCount,
    addToOrder,
    currentCustomizationId,
    // customizations,
    customizationsRemaining,
    handleCustomizationAmountIncrement,
    handleCustomizationAmountChange,
    handleCustomizationAmountDecrement
}) => {
    // eslint-disable-next-line no-unused-vars
    const [customizationId, setCustomizationId] = useState(1);
    const [selectedMeat, setSelectedMeat] = useState({});
    const [meatVariant, setMeatVariant] = useState("");
    const [selectedCarb, setSelectedCarb] = useState({});
    const [carbVariant, setCarbVariant] = useState("");
    const [selectedVeg, setSelectedVeg] = useState([]);
    const [comments, setComments] = useState("");
    // init object containing all the data for the current customization
    let customization = {
        customization_number: currentCustomizationId,
        customization_quantity: customizationCount,
        // selectedMeat,
        meat: meatVariant,
        // selectedCarb,
        carb: carbVariant,
        vegetables: selectedVeg,
        comments
    };
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
        comments
    ]);
    useEffect(() => {
        return () => {
            setSelectedMeat({});
            setMeatVariant("");
            setSelectedCarb({});
            setCarbVariant("");
            setSelectedVeg([]);
            setComments("");
        };
    }, [currentCustomizationId]);
    const handleVegClick = selectedVeggie => e => {
        e.preventDefault();
        // console.log(selectedVeggie);
        const alreadySelected = selectedVeg.includes(selectedVeggie);
        if (alreadySelected) {
            const vegList = selectedVeg.filter(veg => veg !== selectedVeggie);
            setSelectedVeg(vegList);
        } else {
            const vegList = [...selectedVeg, selectedVeggie];
            setSelectedVeg(vegList);
        }
    };
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
                groups={carbs}
                hasNone={true}
            />
            <hr />
            <CardList
                groupName="meat"
                stateKey="selectedMeat"
                selected={selectedMeat}
                selectedVariant={meatVariant}
                variantKey="meatVariant"
                handleSelect={setSelectedMeat}
                setVariant={setMeatVariant}
                groups={meats}
                hasNone={false}
            />
            <hr />
            <div className="section__item">
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
                                            backgroundImage: `url(${
                                                veg.thumbnail
                                            })`
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
            </div>
            <hr />
            <div className="section__item">
                <h3 className="section__heading">Comments</h3>
                <p className="section__subheading">
                    Please add any comments for this customization
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
