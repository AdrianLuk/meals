import React, { Fragment } from "react";

import Form from "../components/Form";
import FormSnack from "../components/FormSnack";
// import "./foundation.min.css";
import "./App.scss";
const SNACK = "snack";
// const MEAL = "meal";
const App = ({ formType }) => {
    return (
        <Fragment>
            <form
                id="order-form"
                className="order"
                action="/wp-content/themes/fitaxxmeals/page-templates/inc/process-order.php"
                encType="multipart/form-data"
                method="post">
                <div id="form-anchor" />
                {formType === SNACK ? <FormSnack /> : <Form />}
            </form>
        </Fragment>
    );
};

export default App;
