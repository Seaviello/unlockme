import React from 'react';
import { shallow } from 'enzyme';
import {
    getLocks as getLocksMock,
    getLock as getLockMock,
    updateLock as updateLockMock,
    toggleLock as toggleLockMock,
} from '../locks/service';
import { LockProvider } from '../locks';
import { SnackProvider } from '../snacks';

const FAKE_LOCK = {
    id: 1,
    name: 'Las Vegas',
    status: 'CLOSED',
    users: [
        {
            id: 1,
        },
    ],
};

const NEW_FAKE_LOCK = {
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
};

jest.mock('../locks/service');

describe('Lock Context', () => {
    beforeEach(() => jest.clearAllMocks());
    describe('getLocks', () => {
        it('should handle progress of request', () => {
            getLocksMock.mockReturnValue(Promise.resolve(['locks']));
            const wrapper = shallow(<LockProvider />);

            wrapper.instance().getLocks();

            expect(wrapper.state('gettingLocks')).toBe(true);
        });
        it('should handle success of request', async () => {
            getLocksMock.mockReturnValue(Promise.resolve(['locks']));
            const wrapper = shallow(<LockProvider />);

            await wrapper.instance().getLocks();

            expect(wrapper.state('gettingLocks')).toBe(false);
            expect(wrapper.state('locks')).toEqual(['locks']);
        });
        it('should handle failure of request', async () => {
            getLocksMock.mockReturnValue(Promise.reject('ERROR'));
            const wrapper = shallow(<LockProvider />);

            await wrapper.instance().getLocks();

            expect(wrapper.state('gettingLocks')).toBe(false);
            expect(wrapper.state('locks')).toEqual([]);
            expect(wrapper.state('gettingLocksError')).toBe('ERROR');
        });
    });

    describe('getLock', () => {
        it('should return empty lock when id not provided', () => {
            getLockMock.mockReturnValue(Promise.resolve(FAKE_LOCK));
            const wrapper = shallow(<LockProvider />);

            wrapper.instance().getLock();

            expect(wrapper.state('currentLock')).toEqual({ name: '', users: [] });
        });
        it('should handle progress of request', () => {
            getLockMock.mockReturnValue(Promise.resolve(FAKE_LOCK));
            const wrapper = shallow(<LockProvider />);

            wrapper.instance().getLock(1);

            expect(getLockMock).toHaveBeenCalledWith(1);
            expect(wrapper.state('gettingLock')).toBe(true);
        });
        it('should handle success of request', async () => {
            getLockMock.mockReturnValue(Promise.resolve(FAKE_LOCK));
            const wrapper = shallow(<LockProvider />);

            await wrapper.instance().getLock(1);

            expect(wrapper.state('gettingLock')).toBe(false);
            expect(wrapper.state('currentLock')).toBe(FAKE_LOCK);
        });
        it('should handle failure of request', async () => {
            getLockMock.mockReturnValue(Promise.reject('ERROR'));
            const wrapper = shallow(<LockProvider />);

            await wrapper.instance().getLock(1);

            expect(wrapper.state('gettingLock')).toBe(false);
            expect(wrapper.state('gettingLockError')).toBe('ERROR');
        });
    });

    describe('updateLockInformation', () => {
        it('should handle progress of request', () => {
            const wrapper = shallow(<LockProvider />);
            wrapper.setState({ locks: [FAKE_LOCK], updatingLockError: 'ERROR' });
            updateLockMock.mockReturnValue(Promise.resolve({ ...FAKE_LOCK, name: 'tomato' }));

            wrapper.instance().updateLockInformation({ name: 'tomato', users: FAKE_LOCK.users });

            expect(updateLockMock).toHaveBeenCalledWith({ name: 'tomato', users: FAKE_LOCK.users });
            expect(wrapper.state('updatingLock')).toBe(true);
            expect(wrapper.state('updatingLockError')).toBe(null);
        });
        it('should handle success when id not provided', async () => {
            const wrapper = shallow(<LockProvider />);
            wrapper.setState({ locks: [NEW_FAKE_LOCK], updatingLockError: 'ERROR' });
            updateLockMock.mockReturnValue(Promise.resolve(FAKE_LOCK));

            await wrapper
                .instance()
                .updateLockInformation({ name: FAKE_LOCK.name, users: FAKE_LOCK.users });

            expect(updateLockMock).toHaveBeenCalledWith({
                id: undefined,
                name: FAKE_LOCK.name,
                users: FAKE_LOCK.users,
            });
            expect(wrapper.state('updatingLock')).toBe(false);
            expect(wrapper.state('locks')).toEqual([NEW_FAKE_LOCK, FAKE_LOCK]);
        });
        it('should handle success when id provided', async () => {
            const wrapper = shallow(<LockProvider />);
            wrapper.setState({ locks: [FAKE_LOCK], updatingLockError: 'ERROR' });
            updateLockMock.mockReturnValue(Promise.resolve({ ...FAKE_LOCK, name: 'tomato' }));

            await wrapper
                .instance()
                .updateLockInformation({
                    id: FAKE_LOCK.id,
                    name: 'tomato',
                    users: FAKE_LOCK.users,
                });

            expect(updateLockMock).toHaveBeenCalledWith({
                id: FAKE_LOCK.id,
                name: 'tomato',
                users: FAKE_LOCK.users,
            });
            expect(wrapper.state('updatingLock')).toBe(false);
            expect(wrapper.state('locks')).toEqual([{ ...FAKE_LOCK, name: 'tomato' }]);
        });
        it('should handle failure of request', async () => {
            updateLockMock.mockReturnValue(Promise.reject('ERROR'));
            const wrapper = shallow(<LockProvider />);

            await wrapper.instance().updateLockInformation({});

            expect(wrapper.state('updatingLock')).toBe(false);
            expect(wrapper.state('updatingLockError')).toBe('ERROR');
        });
    });

    describe('toggleLock', () => {
        it('should handle progress of request', () => {
            const wrapper = shallow(<LockProvider />);
            const initialTogglingLock = { 1: false, 2: false };
            wrapper.setState({ togglingLock: initialTogglingLock });
            toggleLockMock.mockReturnValue(Promise.resolve({ ...FAKE_LOCK, status: 'OPENED' }));

            wrapper.instance().toggleLock({ id: FAKE_LOCK.id, status: FAKE_LOCK.status });

            expect(toggleLockMock).toHaveBeenCalledWith({ id: FAKE_LOCK.id, newStatus: 'OPENED' });
            expect(wrapper.state('togglingLock')).toEqual({
                ...initialTogglingLock,
                [FAKE_LOCK.id]: true,
            });
        });
        it('should handle success', async () => {
            const wrapper = shallow(<LockProvider />);
            const initialTogglingLock = { 1: false, 2: false };
            wrapper.setState({
                togglingLock: initialTogglingLock,
                locks: [FAKE_LOCK, NEW_FAKE_LOCK],
            });
            toggleLockMock.mockReturnValue(Promise.resolve({ ...FAKE_LOCK, status: 'OPENED' }));

            await wrapper.instance().toggleLock({ id: FAKE_LOCK.id, status: FAKE_LOCK.status });

            expect(toggleLockMock).toHaveBeenCalledWith({ id: FAKE_LOCK.id, newStatus: 'OPENED' });
            expect(wrapper.state('togglingLock')).toEqual(initialTogglingLock);
            expect(wrapper.state('locks')).toEqual([
                { ...FAKE_LOCK, status: 'OPENED' },
                NEW_FAKE_LOCK,
            ]);
        });

        /* Test does not work because of not easy solution to mock `static contextType = SnackContext;` */
        xit('should handle failure of request', async () => {
            const addSnack = jest.fn();
            const wrapper = shallow(<LockProvider />, { addSnack });
            const initialTogglingLock = { 1: false, 2: false };
            wrapper.setState({
                togglingLock: initialTogglingLock,
                locks: [FAKE_LOCK, NEW_FAKE_LOCK],
            });
            toggleLockMock.mockReturnValue(
                Promise.reject({ status: 403, lock: { name: FAKE_LOCK.name } })
            );

            await wrapper.instance().toggleLock({ id: FAKE_LOCK.id, status: FAKE_LOCK.status });

            expect(addSnack).toHaveBeenCalledWith({ variant: 'error', message: '' });
            expect(toggleLockMock).toHaveBeenCalledWith({ id: FAKE_LOCK.id, newStatus: 'OPENED' });
            expect(wrapper.state('togglingLock')).toEqual(initialTogglingLock);
            expect(wrapper.state('locks')).toEqual([FAKE_LOCK, NEW_FAKE_LOCK]);
        });
    });
});
