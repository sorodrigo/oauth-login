import React, { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import { useOAuthState } from './hooks/use-oauth-state.hook';
import { getToken } from './user';
import { AppState } from './index';

const pages: { [name: string]: React.ElementType } = {
  home: React.lazy(() => import('./components/Home/home.component')),
  message: React.lazy(() => import('./components/Message/message.component')),
  admin: React.lazy(() => import('./components/Admin/admin.container'))
};

const messages: { [type: string]: { code?: number; text: string; redirectTo?: string } } = {
  [NOT_FOUND]: { code: 404, text: 'page not found.' },
  callback: { text: 'loading...' },
  forbidden: { code: 403, text: 'forbidden', redirectTo: 'home' }
};

const App: React.FC = () => {
  const oAuthState = useOAuthState();
  const dispatch = useDispatch();
  const { type, routesMap, query = {} } = useSelector((state: AppState) => state.location);
  const isLoggedIn = useSelector((state: AppState) => !!state.user.token);
  const isValidQuery = query.state === oAuthState;

  useEffect(() => {
    if (isValidQuery && typeof query.code === 'string' && typeof query.state === 'string') {
      dispatch(getToken(query.code, query.state));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const route = routesMap[type];
  const hasPermissions = !route.auth || isLoggedIn;
  const Page = hasPermissions ? pages[route.page] : pages.message;
  let messageProps = messages[type];
  if ((type === 'callback' && !isValidQuery) || (route.auth && !isLoggedIn)) {
    messageProps = messages.forbidden;
  }

  return (
    <main>
      <Suspense fallback={null}>
        <Page oAuthState={oAuthState} {...messageProps} />
      </Suspense>
    </main>
  );
};

export default App;
