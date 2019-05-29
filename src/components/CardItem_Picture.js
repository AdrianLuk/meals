import React, { Fragment } from "react";
import SelectDropdown from "./SelectDropdown";

const CardItemWithPic = ({
    handleSelect,
    group,
    stateKey,
    variantKey,
    selected,
    handleVariationChange
}) => {
    // console.log(selected);
    return (
        <Fragment>
            <div
                style={{ flex: "0 1 auto" }}
                className="card small-12 large-4"
                key={group.id}>
                <img
                    style={{ maxHeight: 200 }}
                    src={group.featured_image}
                    alt={group.post_title}
                />
                <div className="card-divider">{group.post_title}</div>
                <div className="card-section">
                    {group.acf.variations && (
                        <SelectDropdown
                            stateKey={stateKey}
                            variantKey={variantKey}
                            handleVariationChange={handleVariationChange}
                            options={group.acf.variations}
                        />
                    )}
                </div>
                <button
                    style={{
                        padding: "1rem",
                        borderTop: "1px solid black"
                    }}
                    onClick={handleSelect(stateKey, group)}>
                    Select
                </button>
            </div>
        </Fragment>
    );
};

export default CardItemWithPic;
