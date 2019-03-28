/* Logic here is prepared for demonstration purposes, don't look for good practices in this place. */
import { fakeApiCall } from "../../utils/fakeApiCall";

const FAKE_LOCK_LIST = [
  {
    id: 1,
    name: "Las Vegas",
    status: "CLOSED",
    users: [
      {
        id: 1
      }
    ]
  },
  {
    id: 2,
    name: "San Francisco",
    status: "CLOSED",
    users: [
      {
        id: 1
      },
      {
        id: 3
      }
    ]
  },
  {
    id: 3,
    name: "New York City",
    status: "CLOSED",
    users: [
      {
        id: 1
      },
      {
        id: 3
      }
    ]
  }
];

export const getLocks = () =>
  fakeApiCall({
    data: FAKE_LOCK_LIST.map(({ id, name, status }) => ({ id, name, status }))
  });
export const getLock = id =>
  fakeApiCall({ data: FAKE_LOCK_LIST.find(lock => lock.id === id) });
export const updateLock = async ({ id, name, users }) => {
  if (id) {
    const index = FAKE_LOCK_LIST.findIndex(lock => lock.id === id);
    const updatedLock = {
      ...FAKE_LOCK_LIST[index],
      name,
      users: users.map(id => ({ id }))
    };
    const data = await fakeApiCall({ data: updatedLock });
    FAKE_LOCK_LIST[index] = updatedLock;
    return data;
  } else {
    const newLock = {
      id: FAKE_LOCK_LIST.length + 1,
      status: "CLOSED",
      name,
      users: users.map(id => ({ id }))
    };
    const data = await fakeApiCall({ data: newLock });
    FAKE_LOCK_LIST.push(newLock);
    return data;
  }
};
export const openLock = ({ id, newStatus }) =>
  fakeApiCall({
    data: { ...FAKE_LOCK_LIST.find(lock => lock.id === id), status: newStatus }
  });
