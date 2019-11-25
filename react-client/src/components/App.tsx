import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {PageNotFound} from 'components/errors/PageNotFound';
import {Home} from 'components/Home';
import {Login} from 'components/Login';
import {jwtService} from 'ts-api-toolkit';

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Switch>
              <PrivateRoute exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route path="/*" component={PageNotFound}/>
          </Switch>
      </BrowserRouter>
  );
};

export default App;

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const isLoggedIn = jwtService.getToken() !== null;
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    )
}
