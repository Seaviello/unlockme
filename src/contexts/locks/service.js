import { fakeApiCall } from "../../utils/fakeApiCall";

const FAKE_LOCK_LIST = [
  {
    id: 0,
    name: "Las Vegas",
    status: "CLOSED"
  },
  {
    id: 1,
    name: "San Francisco",
    status: "CLOSED"
  }
];

export const getLocks = () => fakeApiCall({ data: FAKE_LOCK_LIST });
export const openLock = ({ id, newStatus }) =>
  fakeApiCall({
    data: { ...FAKE_LOCK_LIST.find(lock => lock.id === id), status: newStatus }
  });
