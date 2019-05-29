import React, { Component, Fragment } from "react";
// import SelectDropdown from "./SelectDropdown";
import CardItemWithPic from "./CardItem_Picture";

export class CardList extends Component {
    // constructor(props){
    //     super(props);
    //     this.dropdown = React.createRef();
    // }
    state = {};
    handleVariationChange = e => {
        console.log(e);
    };
    render() {
        const {
            groups,
            handleSelect,
            stateKey,
            selected,
            // groupName,
            variantKey
        } = this.props;
        console.log(selected.post_title);
        const groupRow =
            groups &&
            groups.map(group => (
                <CardItemWithPic
                    key={group.id}
                    group={group}
                    selected={selected}
                    handleSelect={handleSelect}
                    handleVariationChange={this.handleVariationChange}
                    stateKey={stateKey}
                    variantKey={variantKey}
                />
            ));
        return (
            <Fragment>
                <div className="grid-x grid-margin-x align-spaced">
                    {groupRow}
                </div>
            </Fragment>
        );
    }
}

export default CardList;
