import { fakeApiCall } from '../../utils/fakeApiCall';

const FAKE_LOG_LIST = [];

/* This should happen on backend, but for mock purposes it's called here */
export const addLog = ({ userId, username, lockId, lockName, type }) => {
    FAKE_LOG_LIST.push({ id: FAKE_LOG_LIST.length + 1, username, userId, lockId, lockName, type });
};
export const getLogs = () => fakeApiCall({ data: FAKE_LOG_LIST });
