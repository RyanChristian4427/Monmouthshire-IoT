import {action, observable} from 'mobx';
import {createContext} from 'react';

class UserStore {
    @observable
    currentObservedUser = 1.0
}

export const UserStoreContext = createContext(new UserStore());
