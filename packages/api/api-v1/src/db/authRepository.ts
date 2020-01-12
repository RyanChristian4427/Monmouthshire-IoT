import {app} from 'src/app';
import {LoginUser, User} from 'src/models/User';

export const getUser = async (credentials: LoginUser): Promise<User> => {
    return await app.locals.db.one('SELECT * FROM users WHERE email = $1', [credentials.email]);
};
};
