import { AnyAction } from 'redux';

const USER__SET_TOKEN = 'USER__SET_TOKEN';

type UserState = {
  token: string | null;
};

const initialState: UserState = {
  token: null
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case USER__SET_TOKEN: {
      return { ...state, token: action.payload };
    }
    default:
      return state;
  }
}

const setToken = (token: string) => ({
  type: USER__SET_TOKEN,
  payload: token
});

export const getToken = (code: number, state: string) => (dispatch: any) =>
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      code,
      state,
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: 'http://localhost:3000/callback',
      client_secret: process.env.REACT_APP_CLIENT_SECRET
    })
  })
    .then(res => res.json())
    .then(data => dispatch(setToken(data)));
