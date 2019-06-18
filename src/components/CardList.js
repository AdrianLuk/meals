import React, { Fragment } from "react";
// import SelectDropdown from "./SelectDropdown";
import CardItemWithPic from "./CardItem_Picture";

export const CardList = ({
    groups,
    handleSelect,
    stateKey,
    selected,
    selectedVariant,
    // groupName,
    variantKey
}) => {
    // constructor(props){
    //     super(props);
    //     this.dropdown = React.createRef();
    // }
    // state = {
    //     variant: "",
    //     selectedVariant: ""
    // };

    // render() {
    // const {
    //     groups,
    //     handleSelect,
    //     stateKey,
    //     selected,
    //     selectedVariant,
    //     // groupName,
    //     variantKey
    // } = this.props;
    // console.log(selected.post_title);
    // console.log(groups);
    const foodItemRow =
        groups &&
        groups.map(group => (
            <CardItemWithPic
                key={group.id}
                group={group}
                selected={selected}
                handleSelect={handleSelect}
                selectedVariant={selectedVariant}
                // handleVariationChange={this.handleVariationChange}
                stateKey={stateKey}
                variantKey={variantKey}
            />
        ));
    return (
        <Fragment>
            <div className="grid-x grid-margin-x align-spaced">
                {foodItemRow}
                {selectedVariant}
            </div>
        </Fragment>
    );
    // }
};

export default CardList;
