import React, { Fragment } from "react";
import "./table.scss";
import { NO_CARB, ADDON_PRICE } from "../constants";
// const isEmptyObject = object => {
//     if (Object.entries(object).length === 0 && object.constructor === Object) {
//         return true;
//     } else {
//         return false;
//     }
// };
const Table = ({
    customizations,
    addOns,
    selectedPackage,
    goal,
    shipping,
    selectedDelivery,
    deliveryOption,
    total,
}) => {
    // console.log(selectedDelivery);
    // console.log(customizations);
    // console.log(selectedPackage);
    // console.log(goal);
    return (
        <table className="table unstriped">
            <thead className="table__head">
                <tr>
                    <th>Order Summary</th>
                    <th className="text-center">QTY</th>
                    <th className="text-center">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr className="table__row table__row--bold">
                    <td>{selectedPackage.title.rendered}</td>
                    <td />
                    <td>{`$${selectedPackage.acf.price}`}</td>
                </tr>
                <tr className="table__row table__row--indent-1">
                    <td>{`${selectedPackage.acf.meal_count}-meal pack`}</td>
                    <td />
                    <td />
                </tr>
                {goal && (
                    <tr className="table__row table__row--indent-1">
                        <td>{`${goal.acf.portion_description}`}</td>
                        <td />
                        <td>
                            {parseInt(goal.acf.portion_price) > 0
                                ? `$${parseFloat(
                                      +goal.acf.portion_price *
                                          +selectedPackage.acf.meal_count
                                  ).toFixed(2)}`
                                : `Included`}
                        </td>
                    </tr>
                )}
                {customizations?.map((cust, index) => (
                    <Fragment key={index}>
                        <tr className="table__row table__row--bold table__row--indent-1">
                            <td>{`Customized Meal ${index + 1}`}</td>
                            <td className="text-center">{`x${cust.customization_quantity}`}</td>
                            <td />
                        </tr>
                        <tr className="table__row table__row--indent-1-5">
                            <td>
                                {cust.carb.variation ||
                                    cust.carb.post_title ||
                                    NO_CARB}
                            </td>
                            <td />
                            <td>
                                {+cust.carb.extra_charge > 0
                                    ? `$${parseFloat(
                                          cust.carb.extra_charge *
                                              cust.customization_quantity
                                      ).toFixed(2)}`
                                    : ""}
                            </td>
                        </tr>
                        <tr className="table__row table__row--indent-1-5">
                            <td>{cust.meat.variation}</td>
                            <td />
                            <td>
                                {+cust.meat.extra_charge > 0
                                    ? `$${parseFloat(
                                          cust.meat.extra_charge *
                                              cust.customization_quantity
                                      ).toFixed(2)}`
                                    : ""}
                            </td>
                        </tr>
                        <tr className="table__row table__row--indent-1-5">
                            <td>{cust.vegetable.post_title}</td>
                            <td />
                            <td>
                                {cust.vegetable.acf &&
                                cust.vegetable.acf.extra_charge
                                    ? `$${parseFloat(
                                          cust.vegetable.acf.extra_charge *
                                              cust.customization_quantity
                                      ).toFixed(2)}`
                                    : ""}
                            </td>
                        </tr>
                        {cust.comments.length > 0 && (
                            <tr className="table__row table__row--indent-1-5">
                                <td
                                    dangerouslySetInnerHTML={{
                                        __html: cust.comments,
                                    }}
                                />
                                <td />
                                <td />
                            </tr>
                        )}
                    </Fragment>
                ))}
                {addOns.length > 0 && (
                    <>
                        <tr className="table__row table__row--bold">
                            <td>Snacks</td>
                            <td />
                            <td>{`x${parseFloat(
                                addOns.reduce(
                                    (acc, curr) => acc + curr.count,
                                    0
                                ) * ADDON_PRICE
                            ).toFixed(2)}`}</td>
                        </tr>
                        {addOns.map(addOn => (
                            <tr
                                key={addOn.snack.id}
                                className="table__row table__row--indent-1">
                                <td>{addOn.snack.post_title}</td>
                                <td
                                    className={`text-bold text-center`}>{`x${addOn.count}`}</td>
                                <td />
                            </tr>
                        ))}
                    </>
                )}
                {selectedDelivery !== "default" &&
                    deliveryOption === "delivery" && (
                        <Fragment>
                            <tr className="table__row table__row--bold">
                                <td>Delivery Location</td>
                                <td />
                                <td />
                            </tr>
                            <tr className="table__row table__row--indent-1">
                                <td>
                                    {
                                        shipping.delivery_locations[
                                            selectedDelivery
                                        ].location
                                    }
                                </td>
                                <td />
                                <td>{`$${parseInt(
                                    shipping.delivery_locations[
                                        selectedDelivery
                                    ].price
                                ).toFixed(2)}`}</td>
                            </tr>
                        </Fragment>
                    )}
            </tbody>
            <tfoot className="table__footer">
                <tr>
                    <th>Order Total</th>
                    <th />
                    <th className="text-center">{`$${total.toFixed(2)}`}</th>
                </tr>
            </tfoot>
        </table>
    );
};

export default Table;
