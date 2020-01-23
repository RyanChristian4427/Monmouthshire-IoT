import bcrypt from 'bcryptjs';

import { LoginUser, RegistrationUser, toUserAuth, UserAuth } from 'src/models/User';
import { getUser, registerHome, registerUser } from 'src/db/authRepository';

export const checkCredentials = (credentials: LoginUser): Promise<UserAuth> => {
    return new Promise((resolve, reject): void => {
        getUser(credentials)
            .then((user) => {
                bcrypt.compare(credentials.password, user.hashedPassword, (error, success) => {
                    if (success) resolve(toUserAuth(user));

                    if (error) reject(error);
                    else reject('Incorrect Password');
                });
            })
            .catch((error) => {
                if (error.received == 0) reject('Unknown User');
                else reject(error);
            });
    });
};

export const register = (credentials: RegistrationUser): Promise<UserAuth> => {
    return new Promise((resolve, reject): void => {
        bcrypt.hash(credentials.password, 8, (error, hash) => {
            credentials.password = hash;

            if (error) reject(error);

            registerUser(credentials)
                .then((user) => resolve(toUserAuth(user)))
                .catch((error) => {
                    reject(error);
                });
        });
    });
};

export const homeRegister = (credentials: RegistrationUser): Promise<UserAuth> => {
    return new Promise((resolve, reject): void => {
        bcrypt.hash(credentials.password, 8, (error, hash) => {
            credentials.password = hash;
            console.log(`New password hash: ${hash}`);

            if (error) reject(error);

            registerHome(credentials)
                .then((user) => resolve(toUserAuth(user)))
                .catch((error) => {
                    reject(error);
                });
        });
    });
};
