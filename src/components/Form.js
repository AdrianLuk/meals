import React, { Component } from "react";
import Choose from "./form-sections/Choose";
import Customize from "./form-sections/Customize";
import Review from "./form-sections/Review";
import axios from "axios";

export class Form extends Component {
    async componentDidMount() {
        const data = await axios.get("http://meals:8888/wp-json/wp/v2/types");
        console.log(data.data);
    }
    render() {
        const { step } = this.props;
        switch (step) {
            case 1:
                return <Choose />;
            case 2:
                return <Customize />;
            case 3:
                return <Review />;
            default:
                return null;
        }
    }
}

export default Form;
