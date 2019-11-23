export interface LoginUser {
    user: {
        email: string;
        password: string;
    };
}

export const NewLoginUser: LoginUser = {
    user: {
        email: '',
        password: ''
    }
};
