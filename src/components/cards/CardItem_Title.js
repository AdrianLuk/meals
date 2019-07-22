import React from "react";
import SplitButton from "../SplitButtonCard";

const CardItem = ({
    handleSelect,
    handlePackageSelect,
    item,
    cardTitle,
    selectedItem,
    buttonText,
    description,
    stateKey,
    group
}) => {
    const handleClick = () => {
        // e.preventDefault();
        // group === "goals"
        //     ? console.log("goals", stateKey, item)
        //     : console.log("not goals", item);
        group === "goals"
            ? handleSelect(stateKey, item)
            : handlePackageSelect(item);
    };
    return (
        <div
            onClick={
                group === "goals"
                    ? handleSelect(stateKey, item)
                    : handlePackageSelect(item)
            }
            className={
                "card text-center small-12 medium-6 large-4 card__item card__item--title " +
                (item.id === selectedItem.id ? "card__item--active" : "")
            }>
            <div className="card-divider">{cardTitle}</div>
            <div className="card-section">
                {description && <p>{description}</p>}
                <SplitButton
                    handleClick={handleClick}
                    item={item}
                    stateKey={stateKey}
                    group={group}
                    handleSelect={handleSelect}
                    handlePackageSelect={handlePackageSelect}
                    text={buttonText}
                    isActive={item.id === selectedItem.id ? true : false}
                />
            </div>
        </div>
    );
};

export default CardItem;
