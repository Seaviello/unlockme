import { fakeApiCall } from "../../utils/fakeApiCall";

const FAKE_USER_LIST = [
  {
    id: 0,
    username: "admin",
    email: "admin@unlockme.com",
    status: "ACTIVE",
    permission: "ADMIN"
  },
  {
    id: 1,
    username: "tkawik",
    email: "tkawik@unlockme.com",
    status: "ACTIVE",
    permission: "USER"
  }
];

export const getUsers = () => fakeApiCall({ data: FAKE_USER_LIST });
