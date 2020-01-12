import bcrypt from 'bcryptjs';

import {LoginUser, RegistrationUser, toUserAuth, UserAuth} from 'src/models/User';
import {getUser, registerUser} from 'src/db/authRepository';

export const checkCredentials = (credentials: LoginUser): Promise<UserAuth> => {
    return new Promise((resolve, reject): void => {
        getUser(credentials)
            .then((user) => {
                bcrypt.compare(credentials.password, user.hashedPassword, function (err: Error, success: boolean) {
                    if (success) {
                        resolve(toUserAuth(user));
                    }
                    reject('Incorrect Password');
                });
            }).catch(() => {
                reject('Unknown User');
            });
    });
};

export const register = (credentials: RegistrationUser): Promise<UserAuth> => {
    return new Promise((resolve, reject): void => {
        bcrypt.hash(credentials.password, 8, function(err, hash) {
            credentials.password = hash;

            if (err) reject(err);

            registerUser(credentials)
                .then((user) => resolve(toUserAuth(user)))
                .catch((error) => {
                    reject(error);
                });
        });
    });
};
