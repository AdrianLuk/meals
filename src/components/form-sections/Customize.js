import React, { Component } from "react";

export class Customize extends Component {
    render() {
        console.log(this.props);
        const { handleSelect, carbs } = this.props;
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
                <div
                    dangerouslySetInnerHTML={{ __html: carb.excerpt.rendered }}
                />
            </div>
        ));
        return <div>{carbList}</div>;
    }
}

export default Customize;
