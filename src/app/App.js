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
                <form action="#" method="post">
                    <div id="form-anchor" />
                    <Form />
                </form>
            </Fragment>
        );
    }
}

export default App;
