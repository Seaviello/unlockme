import React, { Component, createContext } from 'react';
import { getLogs } from './service';

const Context = createContext();
const { Provider, Consumer } = Context;
class LogProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            logs: [],
            getLogs: this.getLogs,
        };
    }

    getLogs = async () => {
        this.setState({ loading: true, error: null, logs: [] });
        try {
            this.setState({ loading: false, logs: await getLogs() });
        } catch (error) {
            this.setState({ loading: false, error });
        }
    };

    render() {
        return <Provider value={this.state}>{this.props.children}</Provider>;
    }
}

export { LogProvider, Consumer as LogConsumer, Context as LogContext };
