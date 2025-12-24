import { login, TUserState, usersReducer } from "../slices/usersSlice";

const initialState: TUserState = {
    isAuthChecked: false,
    isAuthenticated: false,
    data: null,
    loginUserError: null,
    loginUserRequest: false,
};

describe('Проверка usersReducer login', () => {
    test('Pending', () => {
        const state = usersReducer(initialState, {type: login.pending.type});
        expect(state).toEqual({
            isAuthChecked: false,
            isAuthenticated: false,
            data: null,
            loginUserError: null,
            loginUserRequest: true,
        })
    });
    test('Fulfilled', () => {
        const mockUser = {
            email: 'ais_80@inbox.ru',
            name: 'Aleksei'
        };
        const state = usersReducer(initialState, {
            type: login.fulfilled.type,
            payload: mockUser
        });
        expect(state).toEqual({
            isAuthChecked: true,
            isAuthenticated: true,
            data: mockUser,
            loginUserError: null,
            loginUserRequest: false,            
        });
    });
    test('Rejected', () => {
        const errorMessage = 'Error';
        const state = usersReducer(initialState, {
            type: login.rejected.type,
            error: {message: errorMessage}
        });
        expect(state).toEqual({
            isAuthChecked: true,
            isAuthenticated: false,
            data: null,
            loginUserError: errorMessage,
            loginUserRequest: false,
        })
    });
});

describe('Проверка usersReducer checkUserAuth', () => {
    test('Pending', () => {
        const state = usersReducer(initialState, {type: login.pending.type});
        expect(state).toEqual({
            isAuthChecked: false,
            isAuthenticated: false,
            data: null,
            loginUserError: null,
            loginUserRequest: true,
        })
    });
    test('Fulfilled', () => {
        const mockUser = {
            email: 'ais_80@inbox.ru',
            name: 'Aleksei'
        };
        const state = usersReducer(initialState, {
            type: login.fulfilled.type,
            payload: mockUser
        });
        expect(state).toEqual({
            isAuthChecked: true,
            isAuthenticated: true,
            data: mockUser,
            loginUserError: null,
            loginUserRequest: false,            
        });
    });
    test('Rejected', () => {
        const errorMessage = 'Error';
        const state = usersReducer(initialState, {
            type: login.rejected.type,
            error: {message: errorMessage}

        });
        expect(state).toEqual({
            isAuthChecked: true,
            isAuthenticated: false,
            data: null,
            loginUserError: errorMessage,
            loginUserRequest: false,
        })
    });
});

describe('Проверка usersReducer register', () => {
    test('Pending', () => {
        const state = usersReducer(initialState, {type: login.pending.type});
        expect(state).toEqual({
            isAuthChecked: false,
            isAuthenticated: false,
            data: null,
            loginUserError: null,
            loginUserRequest: true,
        })
    });
    test('Fulfilled', () => {
        const mockUser = {
            email: 'ais_80@inbox.ru',
            name: 'Aleksei'
        };
        const state = usersReducer(initialState, {
            type: login.fulfilled.type,
            payload: mockUser
        });
        expect(state).toEqual({
            isAuthChecked: true,
            isAuthenticated: true,
            data: mockUser,
            loginUserError: null,
            loginUserRequest: false,            
        });
    });
    test('Rejected', () => {
        const errorMessage = 'Error';
        const state = usersReducer(initialState, {
            type: login.rejected.type,
            error: {message: errorMessage}
        });
        expect(state).toEqual({
            isAuthChecked: true,
            isAuthenticated: false,
            data: null,
            loginUserError: errorMessage,
            loginUserRequest: false,
        })
    });
});