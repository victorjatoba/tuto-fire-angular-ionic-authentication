/**
 * The firebase code when user return a firebase call.
 */
export enum FirebaseErrorCode {
    ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL = 'auth/account-exists-with-different-credential',
    ARGUMENT_ERROR = 'auth/argument-error',
    EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
    USER_ALREADY_EXIST_ON_DB = 'auth/user-already-exist'
}
