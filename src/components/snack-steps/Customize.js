import React, { useState, useEffect } from "react";
import CardList from "../cards/CardListSnack";
import "./section.scss";

const Customize = ({
    carbs,
    meats,
    vegetables,
    snacks,
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
        carb: carbVariant,
        vegetable: selectedVeg,
        comments,
        customization_price: custTotal,
    };
    useEffect(() => {
        setCustTotal(
            (carbVariant && carbVariant.extra_charge
                ? +carbVariant.extra_charge * customizationCount
                : 0) +
                (meatVariant && meatVariant.extra_charge
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
            <CardList
                groupName="snack"
                stateKey="selectedCarb"
                selected={selectedCarb}
                selectedVariant={carbVariant}
                variantKey="carbVariant"
                handleSelect={setSelectedCarb}
                setVariant={setCarbVariant}
                groups={salads}
            />
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
