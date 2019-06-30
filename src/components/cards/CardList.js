import React from "react";
// import SelectDropdown from "./SelectDropdown";
import CardItemWithPic from "./CardItem_Picture";

export const CardList = ({
    groups,
    handleSelect,
    hasNone,
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
            <div className="section__grid grid-x grid-margin-x align-center">
                {foodItemRow}
            </div>
            {hasNone && (
                <button
                    onClick={e => {
                        e.preventDefault();
                        handleSelect(`No ${groupName}`);
                        setVariant(`No ${groupName}`);
                    }}
                    className={
                        "input-group select-button " +
                        (selected === `No ${groupName}`
                            ? "select-button--is-active"
                            : "")
                    }>
                    <span className="input-group-field select-button__text">
                        {`No ${groupName}`}
                    </span>
                    <span
                        className={
                            "input-group-label select-button__icon fa " +
                            (selected === `No ${groupName}`
                                ? "fa-check"
                                : "fa-arrow-right")
                        }
                    />
                </button>
            )}
        </div>
    );
};

export default CardList;
