/**
 * The firebase code when user return a firebase call.
 */
export enum FirebaseErrorCode {
    ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL = 'auth/account-exists-with-different-credential',
    ARGUMENT_ERROR = 'auth/argument-error',
    USER_ALREADY_EXIST_ON_DB = 'auth/user-already-exist',
    USER_NOT_FOUND = 'auth/user-not-found'
}
