import React from "react";

const Table = ({ customizations, selectedPackage, goal }) => {
    console.log(customizations, selectedPackage, goal);
    return (
        <table className="text-uppercase unstriped">
            <thead>
                <tr>
                    <th>Order Summary</th>
                    <th>QTY</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{selectedPackage.title.rendered}</td>
                    <td />
                    <td>{`$${selectedPackage.acf.meal_count}`}</td>
                </tr>
                <tr>
                    <td />
                    <td />
                    <td />
                </tr>
            </tbody>
        </table>
    );
};

export default Table;
