import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NOT_FOUND } from 'redux-first-router';
import { useOAuthState } from './hooks/use-oauth-state.hook';
import { Routes } from './router';

const pages: { [name: string]: React.ElementType } = {
  home: React.lazy(() => import('./components/Home/home.component')),
  message: React.lazy(() => import('./components/Message/message.component'))
};

const messages: { [type: string]: { code?: number; text: string } } = {
  [NOT_FOUND]: { code: 404, text: 'page not found.' },
  callback: { text: 'loading...' },
  forbidden: { code: 403, text: 'forbidden' }
};

const App: React.FC = () => {
  const oAuthState = useOAuthState();
  const { type, routesMap, query = {} }: { type: string; routesMap: Routes, query: any } = useSelector(
    (state: any) => state.location
  );
  const isValidQuery = query.state === oAuthState;

  useEffect(() => {
    if (isValidQuery) {
      alert('dispatching user login with code: ' + query.code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const Page = pages[routesMap[type].page];
  let messageProps = messages[type];
  if (type === 'callback' && !isValidQuery) {
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
