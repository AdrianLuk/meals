import React, { Fragment } from "react";
import "./table.scss";

const Table = ({ customizations, selectedPackage, goal }) => {
    console.log(customizations);
    console.log(selectedPackage);
    console.log(goal);
    return (
        <table className="table text-uppercase unstriped">
            <thead class="table__head">
                <tr>
                    <th>Order Summary</th>
                    <th className="text-center">QTY</th>
                    <th className="text-center">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr className="table__row--bold table__row--indent-1">
                    <td>{selectedPackage.title.rendered}</td>
                    <td />
                    <td className="text-center">{`$${
                        selectedPackage.acf.price
                    }`}</td>
                </tr>
                <tr className="table__row table__row--indent-1-5">
                    <td>{`${selectedPackage.acf.meal_count}-meal pack`}</td>
                    <td />
                    <td />
                </tr>
                <tr className="table__row table__row--indent-1-5">
                    <td>{`${goal.acf.portion_description}`}</td>
                    <td />
                    <td class="text-center font-weight-bold">
                        {parseInt(goal.acf.portion_price) > 0
                            ? `$${parseInt(goal.acf.portion_price).toFixed(2)}`
                            : `FREE`}
                    </td>
                </tr>
                {customizations.map((cust, index) => (
                    <Fragment key={index}>
                        <tr className="table__row--bold table__row--indent-1">
                            <td>{`Customized Meal ${index + 1}`}</td>
                            <td class="text-center">{`x${
                                cust.customizationCount
                            }`}</td>
                            <td />
                        </tr>
                        <tr className="table__row table__row--indent-1-5">
                            <td>{cust.carbVariant}</td>
                            <td />
                            <td />
                        </tr>
                        <tr className="table__row table__row--indent-1-5">
                            <td>{cust.meatVariant}</td>
                            <td />
                            <td />
                        </tr>
                        {cust.selectedVeg.length > 0 &&
                            cust.selectedVeg.map((veg, i) => (
                                <tr
                                    className="table__row table__row--indent-1-5"
                                    key={i}>
                                    <td>{veg}</td>
                                    <td />
                                    <td />
                                </tr>
                            ))}
                    </Fragment>
                ))}
            </tbody>
            <tfoot className="table__footer">
                <th>Order Total</th>
                <th />
                <th className="text-center">{`$${(
                    +selectedPackage.acf.price + (goal.id === 164 ? 1 : 0)
                ).toFixed(2)}`}</th>
            </tfoot>
        </table>
    );
};

export default Table;
