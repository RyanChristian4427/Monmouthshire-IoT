import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import PageNotFound from 'components/errors/PageNotFound';
import Home from 'components/Home';

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <Home/>
          </Route>
          <Route path="/*">
            <PageNotFound />
          </Route>
        </Switch>
      </BrowserRouter>
  );
};

export default App;
