/**
 * Firebase json file contains the credentials to access database.
 * To know how to get your firebase database credentials, follow
 * the website bellow instructions.
 *
 * @see https://www.appypie.com/faqs/how-can-i-get-api-key-auth-domain-database-url-and-storage-bucket-from-my-firebase-account
 */
const firebaseConfigJson = require('./../security/firebase-config.json');

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,

  /**
   * Firebase configuration file.
   *
   * Data base name: jatoba-getting-started
   *
   * Used to conect with Firebase database.
   *
   * @see security/firebase-config.json
   */
  firebaseConfig: firebaseConfigJson
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

