import React, { Component, Fragment } from "react";
import StepList from "../components/StepList";
import Pagination from "../components/Pagination";
import "./App.scss";

export class App extends Component {
    state = {
        step: 1
    };
    handlePrevStepChange = event => {
        event.preventDefault();
        this.setState({ step: this.state.step - 1 });
    };
    handleNextStepChange = event => {
        event.preventDefault();
        this.setState({ step: this.state.step + 1 });
    };
    render() {
        return (
            <Fragment>
                <StepList step={this.state.step} />
                <Pagination
                    handleNextStepChange={this.handleNextStepChange}
                    handlePrevStepChange={this.handlePrevStepChange}
                    step={this.state.step}
                />
            </Fragment>
        );
    }
}

export default App;
