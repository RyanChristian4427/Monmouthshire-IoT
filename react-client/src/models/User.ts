export interface LoginUser {
    user: {
        user: string;
        password: string;
    };
}

export const NewLoginUser: LoginUser = {
    user: {
        user: '',
        password: ''
    }
};
