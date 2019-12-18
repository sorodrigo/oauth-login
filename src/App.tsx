import React, { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import { useOAuthState } from './hooks/use-oauth-state.hook';
import { Routes } from './router';
import { getToken } from './user';

const pages: { [name: string]: React.ElementType } = {
  home: React.lazy(() => import('./components/Home/home.component')),
  message: React.lazy(() => import('./components/Message/message.component')),
  admin: React.lazy(() => import('./components/Admin/admin.container'))
};

const messages: { [type: string]: { code?: number; text: string } } = {
  [NOT_FOUND]: { code: 404, text: 'page not found.' },
  callback: { text: 'loading...' },
  forbidden: { code: 403, text: 'forbidden' }
};

const App: React.FC = () => {
  const oAuthState = useOAuthState();
  const dispatch = useDispatch();
  const {
    type,
    routesMap,
    query = {}
  }: { type: string; routesMap: Routes; query: any } = useSelector((state: any) => state.location);
  const isLoggedIn = useSelector((state: any) => !!state.user.token);
  const isValidQuery = query.state === oAuthState;

  useEffect(() => {
    if (isValidQuery) {
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
