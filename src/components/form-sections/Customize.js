import React, { useState, useEffect } from "react";
import CardList from "../CardList";

const Customize = ({
    carbs,
    meats,
    vegetables,
    customizationCount,
    addToOrder,
    currentCustomizationId,
    // customizations,
    handleCustomizationAmountIncrement,
    handleCustomizationAmountDecrement
}) => {
    // eslint-disable-next-line no-unused-vars
    const [customizationId, setCustomizationId] = useState(1);
    const [selectedMeat, setSelectedMeat] = useState({});
    const [meatVariant, setMeatVariant] = useState("");
    const [selectedCarb, setSelectedCarb] = useState({});
    const [carbVariant, setCarbVariant] = useState("");
    const [selectedVeg, setSelectedVeg] = useState([]);
    let customization = {
        currentCustomizationId,
        selectedMeat,
        meatVariant,
        selectedCarb,
        carbVariant,
        selectedVeg,
        customizationCount
    };
    useEffect(() => {
        console.log(customization);
        // setCustomization({
        //     customizationId,
        //     selectedMeat,
        //     meatVariant,
        //     selectedCarb,
        //     carbVariant,
        //     selectedVeg
        // });
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
        customizationCount
    ]);
    useEffect(() => {
        return () => {
            setSelectedMeat({});
            setMeatVariant("");
            setSelectedCarb({});
            setCarbVariant("");
            setSelectedVeg([]);
        };
    }, [currentCustomizationId]);
    // console.log(customization);
    // addToOrder(customization);
    // useEffect(() => {
    //     console.log(customization.meatVariant);
    //     console.log(meatVariant);
    //     return () => {
    //         addToOrder(
    //             customizationId,
    //             selectedMeat,
    //             meatVariant,
    //             selectedCarb,
    //             carbVariant,
    //             selectedVeg
    //         );
    //     };
    // }, [
    //     addToOrder,
    //     carbVariant,
    //     customization,
    //     customizationId,
    //     meatVariant,
    //     selectedCarb,
    //     selectedMeat,
    //     selectedVeg
    // ]);
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
        <section className="section--customize">
            <div>
                <p> Choose number of meals for this customization </p>
                <div
                    className="input-group plus-minus-input align-center"
                    style={{ width: 200 }}>
                    <div className="input-group-button">
                        <button
                            onClick={handleCustomizationAmountDecrement}
                            type="button"
                            className="button hollow circle">
                            <i className="fa fa-minus" aria-hidden="true" />
                        </button>
                    </div>
                    <input
                        className="input-group-field"
                        type="number"
                        readOnly
                        value={customizationCount}
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
                groupName="carbs"
                stateKey="selectedCarb"
                selected={selectedCarb}
                selectedVariant={carbVariant}
                variantKey="carbVariant"
                handleSelect={setSelectedCarb}
                setVariant={setCarbVariant}
                groups={carbs}
            />
            <hr />
            <CardList
                groupName="meats"
                stateKey="selectedMeat"
                selected={selectedMeat}
                selectedVariant={meatVariant}
                variantKey="meatVariant"
                handleSelect={setSelectedMeat}
                setVariant={setMeatVariant}
                groups={meats}
            />
            <hr />
            <div className="grid-x grid-margin-x align-center">
                {vegetables &&
                    vegetables.map(veg => (
                        <div
                            className={
                                "card small-12 large-4 card__item card__item--picture " +
                                (selectedVeg.includes(veg.post_title)
                                    ? "card__item--active"
                                    : "")
                            }
                            key={veg.id}>
                            <div className="card-divider">{veg.post_title}</div>
                            <div className="card-section">
                                <button
                                    onClick={handleVegClick(veg.post_title)}
                                    className={"input-group select-button "}>
                                    <span className="input-group-field select-button__text">
                                        {selectedVeg.includes(veg.post_title)
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
        </section>
    );
};

export default Customize;
