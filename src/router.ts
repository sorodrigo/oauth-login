import { connectRoutes, NOT_FOUND, replace } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll';
import qs from 'query-string';

type Route = {
  path: string,
  title?: string,
  page: string,
  thunk?: () => void
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
  title: (state: any) => {
    const route = routes[state.location.type];

    if (!route.title) {
      return 'oauth-login';
    }

    return route;
  },
  restoreScroll: restoreScroll()
};

export default connectRoutes(routes, config);