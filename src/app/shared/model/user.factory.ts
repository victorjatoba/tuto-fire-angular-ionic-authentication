import { User } from './user.model';

/**
 * Factory design pattern to create user
 *
 * @see User from './user.model'
 */
export class UserFactory {

    /**
     * Factory method to create user object
     *
     * @param user Object containing the user information.
     */
    static createUser(userProfile): User {
        return {
            firstName: userProfile.first_name,
            lastName: userProfile.last_name,
            email: userProfile.email,
            id: userProfile.id,
            password: '',
            username: ''
        };
    }
}
