import React, { Component } from "react";
import CardList from "../CardList";

export class Customize extends Component {
    render() {
        console.log(this.props);
        const { handleSelect, carbs, meats, vegetables, meta } = this.props;
        // const foodGroups = [carbs, meats];
        const carbsList = carbs.map(carb => (
            <CardList
                groupName="carbs"
                stateKey="selectedCarb"
                handleSelect={handleSelect}
                key={carb.id}
                group={carb}
            />
        ));
        const meatsList = meats.map(meat => (
            <CardList
                groupName="meats"
                statekey="selectedMeat"
                handleSelect={handleSelect}
                key={meat.id}
                group={meat}
            />
        ));
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
                {carbsList}
                {meatsList}
            </div>
        );
    }
}

export default Customize;
