import React, { Component, createContext } from 'react';
import { getUsers } from './service';

const Context = createContext();
const { Provider, Consumer } = Context;
class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            users: [],
            getUsers: this.getUsers,
        };
    }

    getUsers = async () => {
        this.setState({ loading: true, error: null, users: [] });
        try {
            this.setState({ loading: false, users: await getUsers() });
        } catch (error) {
            this.setState({ loading: false, error });
        }
    };

    render() {
        return <Provider value={this.state}>{this.props.children}</Provider>;
    }
}

export { UserProvider, Consumer as UserConsumer, Context as UserContext };
