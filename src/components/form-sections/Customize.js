import React, { Component } from "react";
import CardList from "../CardList";

export class Customize extends Component {
    render() {
        // console.log(this.props);
        const { handleSelect, carbs, meats, vegetables, meta } = this.props;
        // const foodGroups = [carbs, meats];

        const carbList = carbs.map(carb => (
            <div onClick={handleSelect("selectedGoal", carb)} key={carb.id}>
                <div>{carb.title.rendered}</div>
                <select>
                    {carb.acf.variations.map((variation, index) => (
                        <option key={index} value={variation.variation}>
                            {variation.variation}
                        </option>
                    ))}
                </select>
            </div>
        ));
        return (
            <div>
                <CardList
                    groupName="carbs"
                    stateKey="selectedCarb"
                    variantKey="carbVariant"
                    handleSelect={handleSelect}
                    groups={carbs}
                />
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
