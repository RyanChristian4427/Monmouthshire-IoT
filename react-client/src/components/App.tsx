import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import PageNotFound from 'components/errors/PageNotFound';
import Home from 'components/Home';
import Login from 'components/Login';

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/">
                  <Home/>
              </Route>
              <Route path="/login">
                  <Login/>
              </Route>
              <Route path="/*">
                  <PageNotFound/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
};

export default App;
