import React, { Component, Fragment } from "react";

import Form from "../components/Form";
// import "./foundation.min.css";
import "./App.scss";

export class App extends Component {
    state = {
        step: 1
    };

    // handleSubmit = e => {
    //     console.log("submitted");
    //     e.preventDefault();
    // };
    render() {
        return (
            <Fragment>
                <form
                    id="order-form"
                    className="order"
                    action="http://almojuela.com/fitaxxmeals/wp-content/themes/fitaxxmeals/page-templates/inc/process-order.php"
                    encType="multipart/form-data"
                    method="post">
                    <div id="form-anchor" />
                    <Form />
                </form>
            </Fragment>
        );
    }
}

export default App;
