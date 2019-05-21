import React, { Fragment } from "react";

const CardItemWithPic = ({ handleSelect, item, selectedItem }) => {
    return (
        <Fragment>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        color: item.id === selectedItem.id ? "red" : "black"
                    }}>
                    {item.title.rendered}
                </div>
                <div
                    style={{
                        color: item.id === selectedItem.id ? "red" : "black"
                    }}>
                    {item.acf.price}
                </div>
            </div>
            <button onClick={handleSelect("selectedPackage", item)}>
                Select
            </button>
        </Fragment>
    );
};

export default CardItemWithPic;
