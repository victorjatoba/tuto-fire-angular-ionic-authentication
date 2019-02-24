/**
 * The persisted User object.
 */
export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    token?: string;
    email: string;
    picture: string;
}
