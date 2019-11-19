import { observable, action } from 'mobx';
import {LoginUser} from 'models/User';

export class AuthStore {
    @observable currentUser: LoginUser = { email: '', password: '' };

    @action login(user: { email: string; password: string }): void {
        this.currentUser = user;
    }
}

export default new AuthStore();
