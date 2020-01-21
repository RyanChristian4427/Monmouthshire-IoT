import jwt from 'jsonwebtoken';

import { JWT_SECRET } from 'src/util/secrets';

export interface LoginUser {
    email: string;
    password: string;
}

export interface RegistrationUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
}

export interface UserAuth {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

export const toUserAuth = (user: User): UserAuth => {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token,
    };
};
