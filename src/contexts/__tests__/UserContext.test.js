import React from 'react';
import { shallow } from 'enzyme';
import { getUsers as getUsersMock } from '../users/service';
import { UserProvider } from '../users';
import { FAKE_USER_LIST } from '../users/service';

jest.mock('../users/service');

describe('User Context', () => {
    it('should have proper initialState', () => {
        const wrapper = shallow(<UserProvider />);
        expect(wrapper.state('users')).toEqual([]);
        expect(wrapper.state('loading')).toEqual(false);
        expect(wrapper.state('error')).toEqual(null);
        expect(wrapper.state('getUsers')).toEqual(expect.any(Function));
    });

    describe('getUsers', () => {
        it('should handle progress of request', () => {
            getUsersMock.mockReturnValue(Promise.resolve(FAKE_USER_LIST));
            const wrapper = shallow(<UserProvider />);
            wrapper.instance().getUsers();
            expect(wrapper.state('loading')).toBe(true);
        });
        it('should handle success of request', async () => {
            getUsersMock.mockReturnValue(Promise.resolve(FAKE_USER_LIST));
            const wrapper = shallow(<UserProvider />);
            await wrapper.instance().getUsers();
            expect(wrapper.state('loading')).toBe(false);
            expect(wrapper.state('users')).toBe(FAKE_USER_LIST);
        });
        it('should handle failure of request', async () => {
            getUsersMock.mockReturnValue(Promise.reject('ERROR'));
            const wrapper = shallow(<UserProvider />);
            await wrapper.instance().getUsers();
            expect(wrapper.state('loading')).toBe(false);
            expect(wrapper.state('users')).toEqual([]);
            expect(wrapper.state('error')).toBe('ERROR');
        });
    });
});
