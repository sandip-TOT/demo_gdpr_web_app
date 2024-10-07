import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, createUserSuccess } from './user.actions';
import { User } from '../services/user.service';

export interface UserState {
    users: User[];
    error: any;
}

export const initialState: UserState = {
    users: [],
    error: null,
};

export const userReducer = createReducer(
    initialState,
    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        users: users,
        error: null,
    })),
    on(createUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user],
        error: null,
    }))
);
