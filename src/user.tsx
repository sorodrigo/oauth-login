import { AnyAction } from 'redux';
import { batch } from 'react-redux';
import { redirect } from "redux-first-router";

const USER__SET_TOKEN = 'USER__SET_TOKEN';
const USER__SET_DETAILS = 'USER__SET_DETAILS';

export type UserDetails = {
  login: string,
  avatar_url: string,
  bio: string,
  name: string | null,
  repos_url: string,
  html_url: string
};

type UserState = {
  token: string | null,
  details: UserDetails | null
};

const initialState: UserState = {
  token: null,
  details: null
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case USER__SET_TOKEN: {
      return { ...state, token: action.payload.access_token };
    }
    case USER__SET_DETAILS: {
      return { ...state, details: action.payload };
    }
    default:
      return state;
  }
}

const setToken = (token: string) => ({
  type: USER__SET_TOKEN,
  payload: token
});

const setDetails = (details: string) => ({
  type: USER__SET_DETAILS,
  payload: details
});

export const getToken = (code: number, state: string) => (dispatch: any) =>
  fetch('https://oauth-login.now.sh/proxy', {
    method: 'POST',
    body: JSON.stringify({
      code,
      state
    })
  })
    .then(res => res.json())
    .then(data => batch(() => {
      dispatch(setToken(data));
      dispatch(redirect({ type: 'dashboard' }));
    }));

export const getDetails = () => (dispatch: any, getState: any) => {
  const { user } = getState();
  fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
    .then(res => res.json())
    .then(data => dispatch(setDetails(data)));
};
