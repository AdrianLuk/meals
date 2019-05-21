import React, { Component, Fragment } from "react";
import SelectDropdown from "./SelectDropdown";

export class CardList extends Component {
    render() {
        const {
            groups,
            handleSelect,
            stateKey,
            groupName,
            variantKey
        } = this.props;
        const groupRow =
            groups &&
            groups.map(group => (
                <div
                    key={group.id}
                    onClick={handleSelect(stateKey, group.post_title)}>
                    <div>{group.post_title}</div>
                    {group.acf.variations && (
                        <SelectDropdown
                            stateKey={stateKey}
                            variantKey={variantKey}
                            handleSelect={handleSelect}
                            options={group.acf.variations}
                        />
                    )}
                </div>
            ));
        return <Fragment>{groupRow}</Fragment>;
    }
}

export default CardList;
