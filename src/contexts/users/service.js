import { fakeApiCall } from '../../utils/fakeApiCall';

export const FAKE_USER_LIST = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@unlockme.com',
        status: 'ACTIVE',
        permission: 'ADMIN',
    },
    {
        id: 2,
        username: 'tkawik',
        email: 'tkawik@unlockme.com',
        status: 'ACTIVE',
        permission: 'USER',
    },
    {
        id: 3,
        username: 'newguy',
        email: 'newguy@unlock.com',
        status: 'ACTIVE',
        permission: 'USER',
    },
];

export const getUsers = () => fakeApiCall({ data: FAKE_USER_LIST });
