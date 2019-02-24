import { User } from './user.model';
import { UserType } from '../const/user-type.enum';

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
    static createUser(userProfile, type: UserType): User {
        switch (type) {
            case UserType.FACEBOOK:
                return UserFactory.createFacebookUser(userProfile);

            case UserType.GOOGLE:
                return UserFactory.createGoogleUser(userProfile);

            case UserType.TWITTER:
                return UserFactory.createTwitterUser(userProfile);

            default:
                throw new Error('Type of user does not exist');
        }
    }

    private static createFacebookUser(userProfile: any): User {
        return {
            authService: UserType.FACEBOOK,
            firstName: userProfile.first_name,
            lastName: userProfile.last_name,
            email: userProfile.email,
            id: userProfile.id,
            gender: userProfile.gender,
            picture: userProfile.picture,
            password: '',
            username: ''
        };
    }

    private static createGoogleUser(userProfile: any): User {
        return {
            authService: UserType.GOOGLE,
            firstName: userProfile.given_name,
            lastName: userProfile.family_name,
            email: userProfile.email,
            id: userProfile.id,
            gender: userProfile.gender,
            picture: userProfile.picture,
            password: '',
            username: ''
        };
    }

    private static createTwitterUser(userProfile: any): User {
        return {
            authService: UserType.TWITTER,
            firstName: userProfile.given_name,
            lastName: userProfile.family_name,
            email: userProfile.email,
            id: userProfile.id,
            gender: userProfile.gender,
            picture: userProfile.picture,
            password: '',
            username: ''
        };
    }
}
