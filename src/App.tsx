import React, { Suspense } from 'react';
import { NOT_FOUND } from "redux-first-router";
import { useSelector } from 'react-redux';

const pages: { [name: string]: React.ElementType } = {
  home: React.lazy(() => import('./components/Home/home.component')),
  [NOT_FOUND]: React.lazy(() => import('./components/NotFound/not-found.component'))
};

const App: React.FC = (props) => {
  const route: string = useSelector((state: any) => state.location.type);
  const Page = pages[route];
  return (
    <main>
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    </main>
  );
};

export default App;
