import { apiService, jwtService } from 'ts-api-toolkit';
import { LoginUser } from 'models/User';

export const login = (credentials: LoginUser): Promise<string> => {
    return new Promise((resolve) => {
        apiService.post('users/login', credentials)
            .then(({ data }) => {
                jwtService.saveToken(data.token);
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
