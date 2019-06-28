import React from "react";
// import SelectDropdown from "./SelectDropdown";
import CardItemWithPic from "./CardItem_Picture";

export const CardList = ({
    groups,
    handleSelect,
    stateKey,
    selected,
    selectedVariant,
    setVariant,
    groupName,
    variantKey
}) => {
    const foodItemRow =
        groups &&
        groups.map(group => (
            <CardItemWithPic
                key={group.id}
                group={group}
                selected={selected}
                handleSelect={handleSelect}
                selectedVariant={selectedVariant}
                setVariant={setVariant}
                // handleVariationChange={this.handleVariationChange}
                stateKey={stateKey}
                variantKey={variantKey}
            />
        ));
    return (
        <div className="section__item">
            <h2 className="section__heading">{`Select your ${groupName}`}</h2>
            <p className="section__subheading">{`Select one ${groupName} option per order`}</p>
            <div className="grid-x grid-margin-x align-center">
                {foodItemRow}
            </div>
        </div>
    );
};

export default CardList;
