import React, { useState, Fragment } from "react";
import SplitButton from "../SplitButton";
import Cleave from "cleave.js/react";
import "./logistics.scss";
// eslint-disable-next-line no-unused-vars
import CleavePhone from "cleave.js/dist/addons/cleave-phone.ca";

const useForm = initialValues => {
    const [values, setValues] = useState(initialValues);
    return [
        values,
        e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        }
    ];
};
const Logistics = ({
    shipping,
    handleSelect,
    setDeliveryOption,
    deliveryOption
}) => {
    // const [deliveryOption, setDeliveryOption] = useState("delivery");
    // const [fullName, setFullName] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    const [city, setCity] = useState("default");
    const [values, handleChange] = useForm({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        address2: "",
        // city: "",
        postalCode: "",
        specialInstructions: ""
    });
    // useEffect(() => {
    //     console.log(values);
    // }, [values]);
    // useEffect(() => {
    //     console.log(city);
    // }, [city]);
    // const selectDelivery = delivery => e => {
    //     e.preventDefault();
    //     setDeliveryOption(delivery);
    // };
    return (
        <div className="logistics">
            <div className="logistics__grid logistics__buttons grid-x grid-margin-x align-spaced">
                <SplitButton
                    isActive={deliveryOption === "delivery" ? true : false}
                    handleClick={setDeliveryOption("delivery")}
                    text={`Delivery`}
                />
                <SplitButton
                    isActive={deliveryOption === "pickup" ? true : false}
                    handleClick={setDeliveryOption("pickup")}
                    text={`Pick Up`}
                />
            </div>
            <div className="logistics__grid logistics__form-fields grid-x grid-margin-x">
                <input
                    onChange={handleChange}
                    value={values.fullName}
                    name="fullName"
                    placeholder={`Full Name*`}
                    type="text"
                    className="small-12 cell"
                />
                <input
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    placeholder={`Email*`}
                    type="email"
                    className="small-12 large-6 cell"
                />
                <Cleave
                    className="small-12 large-6 cell"
                    options={{ phone: true, phoneRegionCode: "CA" }}
                    onChange={handleChange}
                    placeholder={`Phone Number*`}
                    name="phone"
                    value={values.phone}
                />
                {deliveryOption === "delivery" && (
                    <Fragment>
                        <input
                            className="small-12 cell"
                            type="text"
                            name="address"
                            onChange={handleChange}
                            value={values.address}
                            placeholder={`Address*`}
                        />
                        <input
                            className="small-12 cell"
                            type="text"
                            name="address2"
                            onChange={handleChange}
                            value={values.address2}
                            placeholder={`Address Line 2`}
                        />
                        <select
                            onChange={e => {
                                handleSelect(
                                    shipping.delivery_locations[e.target.value]
                                );
                                setCity(e.target.value);
                            }}
                            value={city}
                            name="city"
                            className="small-12 large-6 cell"
                            placeholder={`City*`}>
                            <option value={`default`} disabled>
                                City
                            </option>
                            {shipping.delivery_locations.map(
                                (location, index) => (
                                    <option key={index} value={index}>{`${
                                        location.location
                                    } ($${parseInt(location.price).toFixed(
                                        2
                                    )})`}</option>
                                )
                            )}
                        </select>
                        <Cleave
                            className="small-12 large-6 cell"
                            options={{ blocks: [3, 3], uppercase: true }}
                            name="postalCode"
                            onChange={handleChange}
                            value={values.postalCode}
                            placeholder={`Postal Code`}
                        />
                    </Fragment>
                )}
                <input
                    onChange={handleChange}
                    value={values.specialInstructions}
                    name="specialInstructions"
                    placeholder={`Special Instructions`}
                    type="text"
                    className="small-12 cell"
                />
            </div>
        </div>
    );
};

export default Logistics;
