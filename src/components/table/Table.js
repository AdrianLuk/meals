import React, { Fragment } from "react";
import "./table.scss";
// const isEmptyObject = object => {
//     if (Object.entries(object).length === 0 && object.constructor === Object) {
//         return true;
//     } else {
//         return false;
//     }
// };
const Table = ({
    customizations,
    selectedPackage,
    goal,
    shipping,
    selectedDelivery,
    deliveryOption,
    total
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
                <tr className="table__row table__row--bold table__row--indent-1">
                    <td>{selectedPackage.title.rendered}</td>
                    <td />
                    <td>{`$${selectedPackage.acf.price}`}</td>
                </tr>
                <tr className="table__row table__row--indent-1-5">
                    <td>{`${selectedPackage.acf.meal_count}-meal pack`}</td>
                    <td />
                    <td />
                </tr>
                <tr className="table__row table__row--indent-1-5">
                    <td>{`${goal.acf.portion_description}`}</td>
                    <td />
                    <td>
                        {parseInt(goal.acf.portion_price) > 0
                            ? `$${parseInt(goal.acf.portion_price).toFixed(2)}`
                            : `FREE`}
                    </td>
                </tr>
                {customizations.map((cust, index) => (
                    <Fragment key={index}>
                        <tr className="table__row table__row--bold table__row--indent-1">
                            <td>{`Customized Meal ${index + 1}`}</td>
                            <td className="text-center">{`x${cust.customization_quantity}`}</td>
                            <td />
                        </tr>
                        <tr className="table__row table__row--indent-1-5">
                            <td>{cust.carb}</td>
                            <td />
                            <td />
                        </tr>
                        <tr className="table__row table__row--indent-1-5">
                            <td>{cust.meat}</td>
                            <td />
                            <td />
                        </tr>
                        <tr className="table__row table__row--indent-1-5">
                            <td>{cust.vegetable}</td>
                            <td />
                            <td />
                        </tr>
                        {cust.comments.length > 0 && (
                            <tr className="table__row table__row--indent-1-5">
                                <td
                                    dangerouslySetInnerHTML={{
                                        __html: cust.comments
                                    }}
                                />
                                <td />
                                <td />
                            </tr>
                        )}
                    </Fragment>
                ))}
                {selectedDelivery !== "default" &&
                    deliveryOption === "delivery" && (
                        <Fragment>
                            <tr className="table__row table__row--bold table__row--indent-1">
                                <td>Delivery Location</td>
                                <td />
                                <td />
                            </tr>
                            <tr className="table__row table__row--indent-1-5">
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
                    <th className="text-center">{`$${total}`}</th>
                </tr>
            </tfoot>
        </table>
    );
};

export default Table;
