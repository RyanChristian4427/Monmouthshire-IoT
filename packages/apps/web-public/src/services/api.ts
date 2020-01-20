import { apiService, jwtService } from 'ts-api-toolkit';
import { LoginUser, RegistrationUser } from 'models/User';

export const login = (credentials: LoginUser): Promise<string> => {
    return new Promise((resolve) => {
        apiService
            .post('users/login', credentials)
            .then(({ data }) => {
                jwtService.saveToken(data.user.token);
                resolve();
            })
            .catch(({ response }) => {
                if (response.data !== '') {
                    resolve(response.data.message);
                } else {
                    resolve('Unknown error while logging in');
                }
            });
    });
};

export const logout = (): void => {
    jwtService.destroyToken();
};

export const register = (credentials: RegistrationUser): Promise<string> => {
    return new Promise((resolve) => {
        apiService
            .post('users/register', credentials)
            .then(({ data }) => {
                jwtService.saveToken(data.user.token);
                resolve();
            })
            .catch(({ response }) => {
                if (response.data !== '') {
                    resolve(response.data.message);
                } else {
                    resolve('Unknown error while registering');
                }
            });
    });
};
