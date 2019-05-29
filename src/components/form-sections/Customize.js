import React, { Component } from "react";
import CardList from "../CardList";

export class Customize extends Component {
    state = {
        customizationId: null,
        selectedMeat: {},
        meatVariant: "",
        selectedCarb: {},
        carbVariant: "",
        selectedVeg: []
    };
    componentDidMount() {}
    handleSelection = (groupKey, selection, variantName, variant) => e => {
        e.preventDefault();
        this.setState({ [groupKey]: selection, [variantName]: variant });
    };
    handleVegClick = selectedVeggie => e => {
        e.preventDefault();
        // console.log(selectedVeggie);
        const alreadySelected = this.state.selectedVeg.includes(selectedVeggie);
        if (alreadySelected) {
            const vegList = this.state.selectedVeg.filter(
                veg => veg !== selectedVeggie
            );
            this.setState({ selectedVeg: vegList });
        } else {
            const vegList = [...this.state.selectedVeg, selectedVeggie];
            this.setState({ selectedVeg: vegList });
        }
    };
    render() {
        // console.log(this.props);
        const {
            // handleSelect,
            carbs,
            meats,
            vegetables,
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
                    selected={this.state.selectedCarb}
                    variantKey="carbVariant"
                    handleSelect={this.handleSelection}
                    groups={carbs}
                />
                <hr />
                <CardList
                    groupName="meats"
                    stateKey="selectedMeat"
                    selected={this.state.selectedMeat}
                    variantKey="meatVariant"
                    handleSelect={this.handleSelection}
                    groups={meats}
                />
                <div className="grid-x grid-margin-x align-spaced">
                    {vegetables &&
                        vegetables.map(veg => (
                            <div className="card small-12 large-4" key={veg.id}>
                                <div
                                    style={{
                                        backgroundColor: this.state.selectedVeg.includes(
                                            veg.post_title
                                        )
                                            ? "#168b95"
                                            : "#e6e6e6"
                                    }}
                                    className="card-divider">
                                    {veg.post_title}
                                </div>

                                <button
                                    style={{
                                        padding: "1rem",
                                        borderTop: "1px solid black"
                                    }}
                                    onClick={this.handleVegClick(
                                        veg.post_title
                                    )}>
                                    Select
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

export default Customize;
