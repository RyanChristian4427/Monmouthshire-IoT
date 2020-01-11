import bcrypt from 'bcryptjs';

import {LoginUser, toUserAuth, UserAuth} from 'src/models/User';
import {getUser} from 'src/db/authRepository';

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


