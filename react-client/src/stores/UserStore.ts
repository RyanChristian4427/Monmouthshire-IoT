import {observable} from 'mobx';
import {createContext} from 'react';

class UserStore {
    @observable
    currentObservedUser = 'b8:27:eb:25:bf:f5';
}

export const UserStoreContext = createContext(new UserStore());
