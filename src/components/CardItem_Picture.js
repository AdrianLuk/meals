import React, { Fragment, useState, useEffect } from "react";
import SelectDropdown from "./SelectDropdown";
// import SplitButton from "./SplitButton";

const CardItemWithPic = ({
    handleSelect,
    group,
    stateKey,
    variantKey,
    setVariant,
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
    const getDropdownValue = e => {
        console.log("gdv");
        setDropdownValue(e);
    };
    return (
        <Fragment>
            <div
                style={{
                    flex: "0 1 auto"
                }}
                className={
                    "card small-12 large-4 card__item card__item--picture " +
                    (isActive ? "card__item--active" : "")
                }
                key={group.id}>
                <img
                    className="card-img"
                    src={group.thumbnail}
                    alt={group.post_title}
                />
                <div className="card-divider">{group.post_title}</div>
                <div className="card-section">
                    {group.acf.variations && (
                        <SelectDropdown
                            group={group}
                            stateKey={stateKey}
                            variantKey={variantKey}
                            options={group.acf.variations}
                            handleSelect={handleSelect}
                            setVariant={setVariant}
                            selected={selected}
                            dropdownValue={dropdownValue}
                            getDropdown={getDropdownValue}
                        />
                    )}
                    <button
                        onClick={e => {
                            e.preventDefault();
                            handleSelect(group);
                            setVariant(dropdownValue);
                        }}
                        className={"input-group select-button "}>
                        <span className="input-group-field select-button__text">
                            {isActive ? "Selected" : "Select"}
                        </span>
                        <span
                            className={
                                "input-group-label select-button__icon fa " +
                                (isActive ? "fa-check" : "fa-arrow-right")
                            }
                        />
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default CardItemWithPic;
