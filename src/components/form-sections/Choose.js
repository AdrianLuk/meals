import React, { Component, Fragment } from "react";
// import axios from "axios";

export class Choose extends Component {
    state = {
        packages: [],
        selectedPackage: null
    };

    render() {
        console.log(this.props);
        return <div>Choose</div>;
    }
}

export default Choose;
