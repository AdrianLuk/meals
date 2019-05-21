import React, { Fragment } from "react";

const CardItem = ({
    handleSelect,
    item,
    selectedItem,
    buttonText,
    description,
    stateKey
}) => {
    return (
        <div className="card small-12 large-4">
            <div className="card-section">
                <div
                    style={{
                        color: item.id === selectedItem.id ? "red" : "black"
                    }}>
                    {item.title.rendered}
                </div>
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
            <button onClick={handleSelect(stateKey, item)}>{buttonText}</button>
        </div>
    );
};

export default CardItem;
