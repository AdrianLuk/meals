import React, { Component, Fragment } from "react";
import SelectDropdown from "./SelectDropdown";

export class CardList extends Component {
    render() {
        const {
            groups,
            handleSelect,
            stateKey,
            // groupName,
            variantKey
        } = this.props;
        const groupRow =
            groups &&
            groups.map(group => (
                <div className="card small-12 large-4" key={group.id}>
                    <div className="card-divider">{group.post_title}</div>
                    <div className="card-section">
                        {group.acf.variations && (
                            <SelectDropdown
                                stateKey={stateKey}
                                variantKey={variantKey}
                                handleSelect={handleSelect}
                                options={group.acf.variations}
                            />
                        )}
                    </div>
                    <button
                        style={{
                            padding: "1rem",
                            borderTop: "1px solid black"
                        }}
                        onClick={handleSelect(stateKey, group.post_title)}>
                        Select
                    </button>
                </div>
            ));
        return (
            <Fragment>
                <div className="grid-x grid-margin-x align-justify">
                    {groupRow}
                </div>
            </Fragment>
        );
    }
}

export default CardList;
