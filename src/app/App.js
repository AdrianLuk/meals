import React, { Fragment, useState } from "react";

import Form from "../components/Form";
import FormSnack from "../components/FormSnack";
// import "./foundation.min.css";
import "./App.scss";
import Button from "../components/pagination/PaginationButton";
const SNACK = "snack";
const MEAL = "meal";
const App = ({ homeUrl }) => {
    const [formType, setFormType] = useState(null);
    return (
        <Fragment>
            <form
                id="order-form"
                className="order"
                action={`${
                    homeUrl ?? ""
                }/wp-content/themes/fitaxxmeals/page-templates/inc/process-order.php`}
                encType="multipart/form-data"
                method="post">
                <div id="form-anchor" />
                {!formType && (
                    <section
                        style={{ minHeight: 200 }}
                        className="section section--choose grid-x grid-margin-x align-center-middle">
                        <div className="section__item">
                            <h2
                                style={{ textAlign: "center" }}
                                className="section__heading">
                                Select Menu
                            </h2>
                            <p className="section__subheading">
                                Choose which menu you'd like to order from.
                            </p>
                            <div className="section__grid grid-x grid-margin-x align-large-justify align-spaced">
                                <Button
                                    text={`Meal`}
                                    handleStepChange={e => {
                                        e.preventDefault();
                                        setFormType(MEAL);
                                    }}
                                />
                                <Button
                                    text={`Snack`}
                                    handleStepChange={e => {
                                        e.preventDefault();
                                        setFormType(SNACK);
                                    }}
                                />
                            </div>
                        </div>
                    </section>
                )}
                {formType === SNACK ? (
                    <FormSnack homeUrl={homeUrl} />
                ) : formType === MEAL ? (
                    <Form homeUrl={homeUrl} />
                ) : null}
            </form>
        </Fragment>
    );
};

export default App;
