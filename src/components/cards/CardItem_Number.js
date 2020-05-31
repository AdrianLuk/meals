import React, { Fragment, useState, useContext } from "react";
import FormContext from "../../contexts/Form";
// import SplitButton from "./SplitButton";

const CardItemNumber = ({ group }) => {
    // console.log(selected.id);
    // console.log(group.id);
    // const maxSnackCount = useContext(SelectedPackageContext);
    const form = useContext(FormContext);
    const [count, setCount] = useState(0);
    const increment = () => {
        +form.snacksRemaining > 0 && setCount(count + 1);
        +form.snacksRemaining > 0 && form.handleSnackChange(group, count + 1);
    };
    const decrement = () => {
        count > 0 && setCount(count - 1);
        count > 0 && form.handleSnackChange(group, count - 1);
    };
    return (
        <Fragment>
            <div
                className={
                    "card small-12 medium-6 large-4 card__item card__item--picture "
                }
                key={group.id}>
                {group?.thumbnail && (
                    <div
                        className="card-img card-img--no-filter"
                        style={{ backgroundImage: `url(${group.thumbnail})` }}
                    />
                )}
                <div className="card-divider">{group.post_title}</div>
                <div className="text-center">
                    {group.acf.extra_charge &&
                        `+ $${parseFloat(group.acf.extra_charge).toFixed(2)}`}
                </div>
                <div className="card-section card-section--snack">
                    <button
                        onClick={e => {
                            e.preventDefault();
                        }}
                        className={
                            "input-group select-button select-button--is-snack"
                        }>
                        <span
                            onClick={decrement}
                            className={
                                "input-group-label select-button__icon select-button__icon--before fa fa-minus"
                            }
                        />
                        <span className="input-group-field select-button__text select-button__text--no-bg select-button__text--square">
                            {count}
                        </span>
                        <span
                            onClick={increment}
                            className={
                                "input-group-label select-button__icon select-button__icon--after fa fa-plus"
                            }
                        />
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default CardItemNumber;