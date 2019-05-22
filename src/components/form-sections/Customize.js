import React, { Component } from "react";
import CardList from "../CardList";

export class Customize extends Component {
    state = {
        selectedMeat: {},
        selectedCarb: {},
        selectedVeg: []
    };
    render() {
        // console.log(this.props);
        const {
            handleSelect,
            carbs,
            meats,
            customizationCount,
            customizations,
            handleCustomizationAmountIncrement,
            handleCustomizationAmountDecrement
        } = this.props;
        // const foodGroups = [carbs, meats];

        // const carbList = carbs.map(carb => (
        //     <div onClick={handleSelect("selectedGoal", carb)} key={carb.id}>
        //         <div>{carb.title.rendered}</div>
        //         <select>
        //             {carb.acf.variations.map((variation, index) => (
        //                 <option key={index} value={variation.variation}>
        //                     {variation.variation}
        //                 </option>
        //             ))}
        //         </select>
        //     </div>
        // ));
        console.log(customizations);
        return (
            <div>
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
                            name="quantity"
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
                    variantKey="carbVariant"
                    handleSelect={handleSelect}
                    groups={carbs}
                />
                <hr />
                <CardList
                    groupName="meats"
                    stateKey="selectedMeat"
                    variantKey="meatVariant"
                    handleSelect={handleSelect}
                    groups={meats}
                />
            </div>
        );
    }
}

export default Customize;
