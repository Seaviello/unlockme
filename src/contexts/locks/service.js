/* Logic here is prepared for demonstration purposes, don't look for good practices in this place. */
import { fakeApiCall } from '../../utils/fakeApiCall';
import { addLog } from '../logs/service';

const FAKE_LOCK_LIST = [
    {
        id: 1,
        name: 'Las Vegas',
        status: 'CLOSED',
        users: [
            {
                id: 1,
            },
        ],
    },
    {
        id: 2,
        name: 'San Francisco',
        status: 'CLOSED',
        users: [
            {
                id: 1,
            },
            {
                id: 3,
            },
        ],
    },
    {
        id: 3,
        name: 'New York City',
        status: 'CLOSED',
        users: [
            {
                id: 1,
            },
            {
                id: 3,
            },
        ],
    },
];

export const getLocks = () =>
    fakeApiCall({
        data: FAKE_LOCK_LIST.map(({ id, name, status }) => ({ id, name, status })),
    });
export const getLock = id => fakeApiCall({ data: FAKE_LOCK_LIST.find(lock => lock.id === id) });
export const updateLock = async ({ id, name, users }) => {
    if (id) {
        const index = FAKE_LOCK_LIST.findIndex(lock => lock.id === id);
        const updatedLock = {
            ...FAKE_LOCK_LIST[index],
            name,
            users: users.map(id => ({ id })),
        };
        const data = await fakeApiCall({ data: updatedLock });
        addLog({ userId: 1, username: 'admin', lockName: data.name, lockId: id, type: 'UPDATED' });
        FAKE_LOCK_LIST[index] = updatedLock;
        return data;
    } else {
        const newLock = {
            id: FAKE_LOCK_LIST.length + 1,
            status: 'CLOSED',
            name,
            users: users.map(id => ({ id })),
        };
        const data = await fakeApiCall({ data: newLock });
        FAKE_LOCK_LIST.push(newLock);
        addLog({
            userId: 1,
            username: 'admin',
            lockName: data.name,
            lockId: data.id,
            type: 'CREATED',
        });
        return data;
    }
};
export const openLock = async ({ id, newStatus }) => {
    const lockIndex = FAKE_LOCK_LIST.findIndex(lock => lock.id === id);
    const lock = FAKE_LOCK_LIST[lockIndex];
    /* If lock does not provide permission for admin user return 403 */
    if (!lock.users.some(user => user.id === 1)) {
        addLog({
            userId: 1,
            username: 'admin',
            lockName: lock.name,
            lockId: id,
            type: 'PERMISSION DENIED',
        });
        return fakeApiCall({ error: { status: 403, lock: { id, name: lock.name } } });
    }
    const data = await fakeApiCall({
        data: { ...FAKE_LOCK_LIST.find(lock => lock.id === id), status: newStatus },
    });
    addLog({ userId: 1, username: 'admin', lockName: lock.name, lockId: id, type: newStatus });
    FAKE_LOCK_LIST[lockIndex] = data;
    return data;
};
