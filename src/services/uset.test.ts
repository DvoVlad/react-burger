import { userSlice } from "./user";
import { initialState } from "./user";
import { setUserData, clearUserData, setStatusIdle, registerUser, authUser, getUserData, updateToken, updateUserData, logout } from "./user";

describe('user reducer', () => {
  it('initializes correctly', () => {
    const state = userSlice.reducer(undefined, {type: ""});
    expect(state).toEqual(initialState);
  });
});

describe('user actions', () => {
  it('setUserData', () => {
    const userObj = {
      name: 'testname',
      email: 'test@mail.ru'
    }
    const state = userSlice.reducer(initialState, {type: setUserData.type, payload: userObj});
    expect(state).toEqual({...initialState, userData: userObj});
  });
  it('clearUserData', () => {
    const initialState = {
      userData: {
        name: 'testname',
        email: 'test@mail.ru'
      },
      errorRegister: null,
      errorAuth: null,
      getDataError: null,
      loadingStatus: null,
      logoutError: null
    }
    const state = userSlice.reducer(initialState, {type: clearUserData.type});
    expect(state).toEqual({...initialState, userData: null});
  });
  it('setStatusIdle', () => {
    const state = userSlice.reducer(initialState, {type: setStatusIdle.type});
    expect(state).toEqual({...initialState, loadingStatus: 'idle'});
  })
});
describe('registerUser async action', () => {
  it('fulfilled', () => {
    const registeredUserResponse = {
      success: true,
      user: {
        email: "test@mail.ru",
        name: "test"
      },
      accessToken: "Bearer fsjfhhrgtrhypjituabsaxzc",
      refreshToken: "asdasfdgsdgfsdfsdfsdfsfsdfsfsf"
    };
    const state = userSlice.reducer(initialState, {type: registerUser.fulfilled.type, payload: registeredUserResponse});
    expect(state).toEqual({...initialState, userData: {
      email: "test@mail.ru",
      name: "test"
    }, errorRegister: null, loadingStatus: 'idle'});
    expect(localStorage.getItem('accessToken')).toBe('fsjfhhrgtrhypjituabsaxzc');
    expect(localStorage.getItem('refreshToken')).toBe('asdasfdgsdgfsdfsdfsdfsfsdfsfsf');
  });
  it('pending', () => {
    const state = userSlice.reducer(initialState, {type: registerUser.pending.type});
    expect(state).toEqual({...initialState, loadingStatus: 'loading'});
  });
  it('rejected', () => {
    const testErrpr = new Error('testError');
    const state = userSlice.reducer(initialState, {type: registerUser.rejected.type, error: testErrpr});
    expect(state).toEqual({...initialState, errorRegister: testErrpr, userData: null, loadingStatus: 'idle'});
  })
});
describe('authUser async action', () => {
  it('fulfilled', () => {
    const authUserResponse = {
      success: true,
      user: {
        email: "test@mail.ru",
        name: "test"
      },
      accessToken: "Bearer fsjfhhrgtrhypjituabsaxzc",
      refreshToken: "asdasfdgsdgfsdfsdfsdfsfsdfsfsf"
    };
    const state = userSlice.reducer(initialState, {type: authUser.fulfilled.type, payload: authUserResponse});
    expect(state).toEqual({...initialState, userData: {
      email: "test@mail.ru",
      name: "test"
    }, errorAuth: null, loadingStatus: 'idle'});
    expect(localStorage.getItem('accessToken')).toBe('fsjfhhrgtrhypjituabsaxzc');
    expect(localStorage.getItem('refreshToken')).toBe('asdasfdgsdgfsdfsdfsdfsfsdfsfsf');
  });
  it('pending', () => {
    const state = userSlice.reducer(initialState, {type: authUser.pending.type});
    expect(state).toEqual({...initialState, loadingStatus: 'loading'});
  });
  it('rejected', () => {
    const testErrpr = new Error('testError');
    const state = userSlice.reducer(initialState, {type: authUser.rejected.type, error: testErrpr});
    expect(state).toEqual({...initialState, errorAuth: testErrpr, userData: null, loadingStatus: 'idle'});
  })
})

describe('getUserData async action', () => {
  it('fulfilled', () => {
    const userResponse = {
      success: true,
      user: {
        email: "test@mail.ru",
        name: "test"
      }
    }
    const state = userSlice.reducer(initialState, {type: getUserData.fulfilled.type, payload: userResponse});
    expect(state).toEqual({...initialState, userData: {
      email: "test@mail.ru",
      name: "test"
    }, getDataError: null, loadingStatus: 'idle'});
  });
  it('pending', () => {
    const state = userSlice.reducer(initialState, {type: getUserData.pending.type});
    expect(state).toEqual({...initialState, loadingStatus: 'loading', getDataError: null});
  });
  it('rejected', () => {
    const testErrpr = new Error('testError');
    const state = userSlice.reducer(initialState, {type: getUserData.rejected.type, error: testErrpr});
    expect(state).toEqual({...initialState, loadingStatus: 'failed', getDataError: testErrpr, userData: null});
  })
})

describe('updateToken async action', () => {
  it('fulfilled', () => {
    const tokenResponse = {
      success: true,
      accessToken: "Bearer fsjfhhrgtrhypjituabsaxzcnew",
      refreshToken: "asdasfdgsdgfsdfsdfsdfsfsdfsfsfnew"
    }
    userSlice.reducer(initialState, {type: updateToken.fulfilled.type, payload: tokenResponse});
    expect(localStorage.getItem('accessToken')).toBe('fsjfhhrgtrhypjituabsaxzcnew');
    expect(localStorage.getItem('refreshToken')).toBe('asdasfdgsdgfsdfsdfsdfsfsdfsfsfnew'); 
  });
  it('rejected', () => {
    localStorage.setItem('accessToken', 'fsjfhhrgtrhypjituabsaxzc');
    localStorage.setItem('refreshToken', 'asdasfdgsdgfsdfsdfsdfsfsdfsfsfnew');
    const state = userSlice.reducer(initialState, {type: updateToken.rejected.type});
    expect(state).toEqual({...initialState, loadingStatus: 'idle', userData: null});
    expect(localStorage.getItem('accessToken')).toBe(null);
    expect(localStorage.getItem('refreshToken')).toBe(null);
  })
});
describe('updateUserData async action', () => {
  it('fulfilled', () => {
    const updateResponse = {
      success: true,
      user: {
        email: "new@mail.ru",
        name: "new name"
      }
    }; 
    const initialState = {
      userData: {
        email: "test@mail.ru",
        name: "test"
      },
      errorRegister: null,
      errorAuth: null,
      getDataError: null,
      loadingStatus: null,
      logoutError: null
    }
    const state = userSlice.reducer(initialState, {type: updateUserData.fulfilled.type, payload: updateResponse});
    expect(state).toEqual({...initialState, userData: {
      email: "new@mail.ru",
      name: "new name"
    }});
  });
  it('rejected', () => {
    const state = userSlice.reducer(initialState, {type: updateUserData.rejected.type});
    expect(state).toEqual(initialState);
  });
});
describe('logout async action', () => {
  it('fulfilled', () => {
    const initialState = {
      userData: {
        email: "test@mail.ru",
        name: "test"
      },
      errorRegister: null,
      errorAuth: null,
      getDataError: null,
      loadingStatus: null,
      logoutError: null
    }
    localStorage.setItem('accessToken', 'fsjfhhrgtrhypjituabsaxzc');
    localStorage.setItem('refreshToken', 'asdasfdgsdgfsdfsdfsdfsfsdfsfsfnew');
    const state = userSlice.reducer(initialState, {type: logout.fulfilled.type});
    expect(state).toEqual({...initialState, userData: null});
    expect(localStorage.getItem('accessToken')).toBe(null);
    expect(localStorage.getItem('refreshToken')).toBe(null);
  })
  it('rejected', () => {
    const testErrpr = new Error('testError');
    const state = userSlice.reducer(initialState, {type: logout.rejected.type, error: testErrpr});
    expect(state).toEqual({...initialState, logoutError: testErrpr});
  })
});