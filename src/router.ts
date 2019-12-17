import { connectRoutes, NOT_FOUND, replace } from 'redux-first-router';
import restoreScroll from 'redux-first-router-restore-scroll';
import qs from 'query-string';

type Route = {
  path: string,
  title?: string,
  thunk?: () => void
};

type Routes = { [name: string]: Route };

export const routes: Routes = {
  home: {
    path: '/',
    title: 'Home - oauth-login'
  },
  [NOT_FOUND]: {
    path: '/404',
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
  // onBeforeChange: (dispatch, getState, { action }) => {},
  // onAfterChange: (dispatch, getState, { action }) => {},
  restoreScroll: restoreScroll()
};

export default connectRoutes(routes, config);
