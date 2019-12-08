import { insert } from 'src/database/databaseConnectors';
import User from 'src/database/models/user';

/**
 * Add new User node
 *
 * @param sensor
 */
export const insertNewUser = (user: User): Promise<User> => {
    const objectKey = 'user';
    const query = `CREATE (user:User {id: {id}})`;

    return insert(query, objectKey, user)
        .then((result) => {
            return result;
        });
};
