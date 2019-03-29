import React, { Component, createContext } from 'react';

const Context = createContext();
const { Provider, Consumer } = Context;
class SnackProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snack: null,
            addSnack: this.addSnack,
            closeSnack: this.closeSnack,
        };
    }

    addSnack = ({ variant, message }) => {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.setState({ snack: { variant, message } });
        this.timeoutId = setTimeout(() => this.setState({ snack: null }), 2000);
    };
    closeSnack = () => {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.setState({ snack: null });
    };

    render() {
        return <Provider value={this.state}>{this.props.children}</Provider>;
    }
}

export { SnackProvider, Consumer as SnackConsumer, Context as SnackContext };
