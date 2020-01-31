import bcrypt from 'bcryptjs';

import { LoginUser, RegistrationUser, toUserAuth, UserAuth } from 'src/models/User';
import { getUser, registerHome, registerUser } from 'src/db/authRepository';

export const checkCredentials = async (credentials: LoginUser): Promise<UserAuth> => {
    const user = await getUser(credentials).catch((error) => {
        if (error.received == 0) throw 'Unknown User';
        else throw error;
    });

    if (await bcrypt.compare(credentials.password, user.hashedPassword)) return toUserAuth(user);
    else throw 'Incorrect Password';
};

export const register = async (credentials: RegistrationUser): Promise<UserAuth> => {
    credentials.password = await bcrypt.hash(credentials.password, 8);
    const user = await registerUser(credentials).catch((error) => {
        throw error;
    });

    if (user) return toUserAuth(user);
};

export const homeRegister = async (credentials: RegistrationUser): Promise<UserAuth> => {
    credentials.password = await bcrypt.hash(credentials.password, 8);
    const user = await registerHome(credentials).catch((error) => {
        throw error;
    });

    if (user) return toUserAuth(user);
};
