/**
 * The persisted User object.
 */
export interface User {
    id: number;
    email: string;
    authService: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    gender?: string;
    token?: string;
    pictureUrl?: string;
}
