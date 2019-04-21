/**
 * The persisted User object.
 */
export interface User {
    id?: number;
    email: string;
    authService: string;
    password: string;
    firstName: string;
    lastName: string;
    username?: string;
    gender?: string;
    token?: string;
    pictureUrl?: string;
}
