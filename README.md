
# Tutorial: #02: Make email and social media authentication
> Cross-platform app showing how to register and loggin with email or social media from firebase.

![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)


![](header.png)

## Technical details:
* Angular 7+
* Ionic 4+
* Firebase

## Installation

### clone repository

git clone https://github.com/victorjatoba/tuto-fire-angular-ionic-authentication.git

### install node packages

1. Go to repository directory
2. run: ```$ npm i```

## Getting started

### import Firebase database authentication configuration

1. Create Firebase database;
2. Acess the database;
3. Click on "Add Firebase to your web app";
4. Copy config values only. Example:

```
<script src="https://www.gstatic.com/firebasejs/5.8.4/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AI...ug",
    authDomain: "your-database-name.firebaseapp.com",
    databaseURL: "https://your-database-name.firebaseio.com",
    projectId: "your-database-name",
    storageBucket: "your-database-name.appspot.com",
    messagingSenderId: "999999999999"
  };
  firebase.initializeApp(config);
</script>
```

See the link bellow with more details how to obtained this credentials.
@see https://www.appypie.com/faqs/how-can-i-get-api-key-auth-domain-database-url-and-storage-bucket-from-my-firebase-account

5. Create directory *security* on the *src* project. ```src/security```
6. create file firebase-config.json
7. Paste config values from step 2 onto firebase-config.json file.
8. Apply json pattern. The firebase-config.json may be just like:

```
{
    "apiKey": "AI...ug",
    "authDomain": "your-database-name.firebaseapp.com",
    "databaseURL": "https://your-database-name.firebaseio.com",
    "projectId": "your-database-name",
    "storageBucket": "your-database-name.appspot.com",
    "messagingSenderId": "999999999999"
}
```

### Enable sign in providers

1. Go to Firebase console;
2. Open your database;
3. Go to Authentication;
4. Click on "sign in method" tab;
5. Enable Google, Facebook and Twitter accounts.

### run the app

run: ```$ ionic serve```

## Meta

Victor Jatobá – [@victorjatoba10](https://twitter.com/victorjatoba10) – victorjatoba10[at]gmail.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/victorjatoba/](https://github.com/victorjatoba/tuto-fire-angular-ionic-authentication/)

## Contributing

1. Fork it (<https://github.com/victorjatoba/tuto-fire-angular-ionic-authentication/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## References

- http://jasonwatmore.com/post/2018/11/16/angular-7-jwt-authentication-example-tutorial#error-interceptor-ts
- https://www.appypie.com/faqs/how-can-i-get-api-key-auth-domain-database-url-and-storage-bucket-from-my-firebase-account
- https://www.positronx.io/full-angular-7-firebase-authentication-system/
