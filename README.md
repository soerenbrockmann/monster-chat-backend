# Monster Chat

1. Create app with express generatoer CLI (https://expressjs.com/en/starter/generator.html)
2. Delete /public and /views folders
3. Install nodemon (-g), babel-cli and babel-preset-env as "dev dependency"
4. Create .babelrc file in root folder with the following content:
   {
   "presets": ["env"]
   }
5. In package.json add script `"dev": "nodemon --exec babel-node ./bin/www"`
6. Convert to ES6 syntax
7. In app.js remove the follwoing lines of code:

```
var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

```

8. In /routes/index.js replace `res.render('index', { title: 'Express' });` with `res.send('respond with a resource');`
9. Run `npm run dev` and make sure your app is running
10. Implement MongoDB

- Install MongoDB on Mac (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) and/or
- Install MongoDB on Windows (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- Install MongoDB Compass (Mac/Windows) (https://docs.mongodb.com/compass/master/install/)
- Install Insomnia (https://insomnia.rest/download/#mac)

11. Install mongoose (npm install mongoose)
12. Establish connection to MongoDB using Mongoose Library
13. Double check whether DB has been created using Mongo Compass

14. Implement JWT authentication strategy using Passport.js library

- Install the following dependencies:

  - npm install jsonwebtoken passport passport-jwt passport-local passport-local-mongoose

- Create User Model using `passportLocalMongoose` plugin in /models/user.js (Create folder and file) (https://www.npmjs.com/package/passport-local-mongoose)

- Create file /authStrategy/authenticate.js

- Create file /config.js and add the following content

```
export default {
  secretKey: '12345-67890-09876-25146',
  mongoURL: 'mongodb://localhost/<your db name>',
};

```

- In file /authStrategy/authenticate.js implement jwt strategy as described here http://www.passportjs.org/packages/passport-jwt/.
  - Import User model and config file
  - Pass config values to opts object
  - Convert to ES6 syntax using async/await for example
  - Pass jwt token from cookie to opts (opts.jwtFromRequest = (req) => req.cookies.jwt)
  - Remove opts.issuer = 'accounts.examplesoft.com' and opts.audience = 'yoursite.net';
  - Import passport and passport-local
  - Export new local strategy `export default passport.use(new LocalStrategy(User.authenticate()));`

15. Create /signup route

    - Create user by User.register() method (https://github.com/saintedlama/passport-local-mongoose#static-methods)
    - Respond with 200

16. Create /login route
    - Add middleware to authenticate with local passport strategy
    - On sucess, generate jwt token
    - Store jwt token inside Cookie with httpOnly: true
    - Respond with 200
