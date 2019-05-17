import React, { Component } from "react";

export class CardList extends Component {
    render() {
        const { group, handleSelect, stateKey, groupName } = this.props;
        return (
            <div
                onClick={handleSelect(stateKey, group.post_title)}
                key={group.id}>
                <div>{group.post_title}</div>
                {/*
                <select>
                    {group.acf.variations &&
                        group.acf.variations.map((variation, index) => (
                            <option key={index} value={variation.variation}>
                                {variation.variation}
                            </option>
                        ))}
                        </select>*/}
            </div>
        );
    }
}

export default CardList;
