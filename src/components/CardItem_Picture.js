import React, { Fragment, useState, useEffect } from "react";
import SelectDropdown from "./SelectDropdown";

const CardItemWithPic = ({
    handleSelect,
    group,
    stateKey,
    variantKey,
    selected
}) => {
    // console.log(selected.id);
    // console.log(group.id);

    const [isActive, setIsActive] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("");
    useEffect(() => {
        if (selected.id === group.id) {
            // console.log(group.id);
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [selected.id, group.id, isActive]);
    useEffect(() => {
        handleSelect(stateKey, group, variantKey, dropdownValue);
    }, [dropdownValue, group, handleSelect, stateKey, variantKey]);
    const getDropdownValue = e => {
        setDropdownValue(e);
        // if (selected.id === group.id) {
        console.log("gdv");
        handleSelect(stateKey, group, variantKey, e);
        //     console.log(e);
        // }
        // console.log(dropdownValue);
    };
    const handleVariationChange = (stateKey, group, variantKey, e) => {
        // console.log(e);
        setDropdownValue(e);
        handleSelect(stateKey, group, variantKey, e);
        console.log("hvc");
    };
    return (
        <Fragment>
            <div
                style={{
                    flex: "0 1 auto",
                    backgroundColor: isActive ? "red" : "inherit"
                }}
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
                            group={group}
                            stateKey={stateKey}
                            variantKey={variantKey}
                            handleVariationChange={handleVariationChange}
                            options={group.acf.variations}
                            handleSelect={handleSelect}
                            selected={selected}
                            dropdownValue={dropdownValue}
                            getDropdown={getDropdownValue}
                        />
                    )}
                </div>
                <button
                    style={{
                        padding: "1rem",
                        borderTop: "1px solid black"
                    }}
                    onClick={handleSelect(
                        stateKey,
                        group,
                        variantKey,
                        dropdownValue
                    )}>
                    Select
                </button>
            </div>
        </Fragment>
    );
};

export default CardItemWithPic;
