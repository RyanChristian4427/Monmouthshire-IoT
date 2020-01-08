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

// There's no real way to type the component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute = ({ component: Component, ...rest }: any): JSX.Element => {
    const isLoggedIn = jwtService.getToken() !== null && jwtService.getToken() !== undefined;
    return (
        <Route {...rest}
               render={(props): React.ReactNode =>
                isLoggedIn
                    ? (<Component {...props} />)
                    : (<Redirect to='/login' />)
            }
        />
    );
};
