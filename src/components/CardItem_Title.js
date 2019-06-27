import React from "react";
import SplitButton from "./SplitButton";

const CardItem = ({
    handleSelect,
    handlePackageSelect,
    item,
    selectedItem,
    buttonText,
    description,
    stateKey,
    group
}) => {
    return (
        <div
            className={
                "card text-center small-12 large-4 card__item card__item--title " +
                (item.id === selectedItem.id ? "card__item--active" : "")
            }>
            <div className="card-divider">{item.title.rendered}</div>
            <div className="card-section">
                {description && (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                )}
                <SplitButton
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
