import { connectRoutes, NOT_FOUND, replace } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll';
import qs from 'query-string';
import { AppState } from './index';

type Route = {
  path: string;
  title?: string;
  page: string;
  auth?: boolean;
  thunk?: () => void;
};

export type Routes = { [name: string]: Route };

export const routes: Routes = {
  home: {
    path: '/',
    page: 'home',
    title: 'Home - oauth-login'
  },
  callback: {
    path: '/callback',
    page: 'message'
  },
  dashboard: {
    path: '/dashboard',
    page: 'admin',
    auth: true
  },
  settings: {
    path: '/settings',
    page: 'admin',
    auth: true
  },
  [NOT_FOUND]: {
    path: '/404',
    page: 'message',
    thunk: () => replace('/404')
  }
};

const config: object = {
  basename: '/',
  notFoundPath: '/404',
  querySerializer: qs,
  title: (state: AppState) => {
    const route = routes[state.location.type];

    if (!route.title) {
      return 'oauth-login';
    }

    return route;
  },
  restoreScroll: restoreScroll()
};

export default connectRoutes(routes, config);
