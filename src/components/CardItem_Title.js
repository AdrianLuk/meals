import React from "react";

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
        <div className="card text-center small-12 large-4">
            <div
                className="card-divider align-center"
                style={{
                    color: item.id === selectedItem.id ? "red" : "black"
                }}>
                {item.title.rendered}
            </div>
            <div className="card-section">
                {description && (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                )}
                <div
                    style={{
                        color: item.id === selectedItem.id ? "red" : "black"
                    }}>
                    {item.acf.price}
                </div>
            </div>
            <button
                style={{ padding: "1rem", borderTop: "1px solid black" }}
                onClick={
                    group === "goals"
                        ? handleSelect(stateKey, item)
                        : handlePackageSelect(item)
                }>
                {buttonText}
            </button>
        </div>
    );
};

export default CardItem;
