import { AnyAction } from 'redux';
import { batch } from 'react-redux';
import { redirect } from 'redux-first-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from './index';

const USER__SET_TOKEN = 'USER__SET_TOKEN';
const USER__SET_DETAILS = 'USER__SET_DETAILS';
const USER__SET_REPOS = 'USER__SET_REPOS';

export type UserDetails = {
  login: string;
  avatar_url: string;
  bio: string;
  name: string | null;
  repos_url: string;
  html_url: string;
};

export type UserRepo = {
  id: number;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
};

export type UserState = {
  token: string | null;
  details: UserDetails | null;
  repos: Array<UserRepo>;
};

const initialState: UserState = {
  token: null,
  details: null,
  repos: []
};

export default function reducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case USER__SET_TOKEN: {
      return { ...state, token: action.payload.access_token };
    }
    case USER__SET_DETAILS: {
      return { ...state, details: action.payload };
    }
    case USER__SET_REPOS: {
      return {
        ...state,
        repos: [...action.payload].sort(
          (a: UserRepo, b: UserRepo) => b.stargazers_count - a.stargazers_count
        )
      };
    }
    default:
      return state;
  }
}

const setToken = (token: string) => ({
  type: USER__SET_TOKEN,
  payload: token
});

const setDetails = (details: UserDetails) => ({
  type: USER__SET_DETAILS,
  payload: details
});

const setRepos = (repos: Array<UserRepo>) => ({
  type: USER__SET_REPOS,
  payload: repos
});

export const getToken = (code: number, state: string) => (
  dispatch: ThunkDispatch<AppState, any, AnyAction>
) =>
  fetch('https://oauth-login.now.sh/proxy', {
    method: 'POST',
    body: JSON.stringify({
      code,
      state
    })
  })
    .then(res => res.json())
    .then(data =>
      batch(() => {
        dispatch(setToken(data));
        dispatch(redirect({ type: 'dashboard' }));
      })
    );

export const getDetails = () => (
  dispatch: ThunkDispatch<AppState, any, AnyAction>,
  getState: () => AppState
) => {
  const { user } = getState();
  fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
    .then(res => res.json())
    .then(data => dispatch(setDetails(data)));
};

export const getRepos = () => (
  dispatch: ThunkDispatch<AppState, any, AnyAction>,
  getState: () => AppState
) => {
  const { user } = getState();
  fetch(`https://api.github.com/user/repos`, {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
    .then(res => res.json())
    .then(data => dispatch(setRepos(data)));
};
