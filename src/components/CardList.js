import React, { Fragment } from "react";
// import SelectDropdown from "./SelectDropdown";
import CardItemWithPic from "./CardItem_Picture";

export const CardList = ({
    groups,
    handleSelect,
    stateKey,
    selected,
    selectedVariant,
    setVariant,
    // groupName,
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
        <Fragment>
            <div className="grid-x grid-margin-x align-center">
                {foodItemRow}
            </div>
        </Fragment>
    );
};

export default CardList;
