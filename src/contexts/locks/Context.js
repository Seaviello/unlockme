import React, { Component, createContext } from "react";
import { getLocks, openLock, getLock, updateLock } from "./service";

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
      gettingLock: false,
      gettingLockError: null,
      updatingLock: false,
      updatingLockError: null,
      locks: [],
      getLocks: this.getLocks,
      getLock: this.getLock,
      addLock: this.addLock,
      toggleLock: this.toggleLock,
      updateLockInformation: this.updateLockInformation,
      currentLock: null
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

  getLock = async id => {
    if (id) {
      this.setState({
        gettingLock: true,
        gettingLockError: null,
        currentLock: null
      });
      try {
        this.setState({ gettingLock: false, currentLock: await getLock(id) });
      } catch (error) {
        this.setState({ gettingLock: false, gettingLockError: error });
      }
    } else {
      this.setState({ currentLock: { name: "", users: [] } });
    }
  };

  updateLockInformation = async ({ id, name, users }) => {
    this.setState({ updatingLock: true, updatingLockError: null });
    try {
      const createdOrUpdatedLock = await updateLock({ id, name, users });
      const currentLocks = this.state.locks;
      const locks = id
        ? currentLocks.map(
            lock => (lock.id === id ? createdOrUpdatedLock : lock)
          )
        : [...currentLocks, createdOrUpdatedLock];

      this.setState({ updatingLock: false, locks, currentLock: null });
    } catch (error) {
      this.setState({ updatingLock: false, updatingLockError: error });
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
