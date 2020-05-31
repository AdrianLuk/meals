import React, { useContext } from "react";
// import SelectDropdown from "./SelectDropdown";
import CardItemNumber from "./CardItem_Number";
import SelectedPackageContext from "../../contexts/SelectedPackage";

export const CardListSnack = ({
    groups,
    handleSelect,
    hasNone,
    stateKey,
    selected,
    selectedVariant,
    setVariant,
    groupName,
    variantKey,
}) => {
    const maxSnackCount = useContext(SelectedPackageContext);
    const foodItemRow =
        groups &&
        groups.map((group) => (
            <CardItemNumber
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
            <h2 className="section__heading">{`Select your ${groupName}s`}</h2>
            <p className="section__subheading">{`Select up to ${maxSnackCount?.acf?.size} snacks (required)`}</p>
            <div className="section__grid grid-x grid-margin-x align-center">
                {foodItemRow}
            </div>
        </div>
    );
};

export default CardListSnack;
