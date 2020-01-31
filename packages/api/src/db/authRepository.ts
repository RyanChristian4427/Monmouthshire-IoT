import { LoginUser, RegistrationUser, User } from 'src/models/User';
import { db } from 'src/util/database';

export const getUser = async (credentials: LoginUser): Promise<User> => {
    return await db.one('SELECT * FROM users WHERE email = $1', [credentials.email]);
};

export const registerUser = async (credentials: RegistrationUser): Promise<User> => {
    return await db.one(
        'INSERT INTO users(first_name, last_name, email, hashed_password) VALUES(${firstName}, ${lastName}, ${email}, ${password}) RETURNING *',
        {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            password: credentials.password,
        },
    );
};

export const registerHome = async (credentials: RegistrationUser): Promise<User> => {
    return await db.one(
        'INSERT INTO users(first_name, last_name, email, hashed_password) VALUES(${firstName}, ${lastName}, ${email}, ${password}) RETURNING *',
        {
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            password: credentials.password,
        },
    );
};
