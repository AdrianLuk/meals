import React, { useContext } from "react";
import CardItemNumber from "./cards/CardItem_Number";
import FormContext from "../contexts/Form";

const Popup = ({ salads, active, toggleModal, handleNoThanks }) => {
    const form = useContext(FormContext);
    return (
        <div
            className={`reveal-overlay`}
            style={{ display: active ? "block" : "none" }}>
            <div
                className="large reveal upsell"
                tabIndex="-1"
                style={{ display: active ? "block" : "none" }}>
                <button
                    onClick={handleNoThanks}
                    className="close-btn"
                    aria-label="Close reveal"
                    type="button">
                    <span aria-hidden="true">×</span>
                </button>
                <div className="modal-header grid-y align-center-middle">
                    <h2
                        className="section__heading"
                        style={{ textAlign: "center" }}>
                        Would you like to
                        <br className="show-for-large" /> add a snack?
                    </h2>
                    <p
                        className="section__subheading"
                        style={{ marginBottom: "0.5rem" }}>
                        You can add up to {form.allowedAddons} snacks to your
                        order
                    </p>
                    <h5
                        className="section__heading"
                        style={{ marginBottom: "1rem", textTransform: "none" }}>
                        $5.00 each
                    </h5>
                    <button
                        onClick={handleNoThanks}
                        type="button"
                        className="pagination__item">
                        No Thanks
                    </button>
                </div>
                <div className="grid-x grid-margin-x grid-container align-justify">
                    {salads?.map(group => (
                        <CardItemNumber key={group.id} group={group} />
                    ))}
                </div>
                <div className="grid-x align-center">
                    <button
                        className={"pagination__item pagination__item--active"}
                        type="button"
                        onClick={toggleModal}>
                        Add Snacks
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
