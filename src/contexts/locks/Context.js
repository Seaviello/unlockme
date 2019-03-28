import React, { Component, createContext } from "react";
import { getLocks, openLock } from "./service";

const Context = createContext();
const { Provider, Consumer } = Context;
class LockProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gettingLocks: false,
      gettingLocksError: null,
      addingLocks: false,
      addingLocksError: null,
      togglingLock: {},
      togglingLockError: {},
      locks: [],
      getLocks: this.getLocks,
      addLock: this.addLock,
      toggleLock: this.toggleLock
    };
  }

  getLocks = async () => {
    this.setState({ gettingLocks: true, gettingLocksError: null, locks: [] });
    try {
      this.setState({ gettingLocks: false, locks: await getLocks() });
    } catch (error) {
      this.setState({ gettingLocks: false, gettingLocksError: error });
    }
  };

  toggleLock = async ({ id, status }) => {
    this.setState({
      togglingLock: { ...this.state.togglingLock, [id]: true },
      togglingLockError: { ...this.state.togglingLockError, [id]: null }
    });
    try {
      const toggledLock = await openLock({
        id,
        newStatus: status === "OPENED" ? "CLOSED" : "OPENED"
      });
      const locks = this.state.locks.map(
        lock => (lock.id === id ? toggledLock : lock)
      );
      this.setState({
        togglingLock: { ...this.state.togglingLock, [id]: false },
        locks
      });
    } catch (error) {
      this.setState({
        togglingLock: { ...this.state.togglingLock, [id]: false },
        togglingLockError: { ...this.state.togglingLockError, [id]: error }
      });
    }
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { LockProvider, Consumer as LockConsumer, Context as LockContext };
