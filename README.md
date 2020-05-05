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

8. Run `npm run dev` and make sure your app is running
