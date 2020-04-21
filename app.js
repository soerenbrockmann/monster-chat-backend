import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import FileStore from 'session-file-store';
import passport from 'passport';
import mongoose from 'mongoose';

import indexRouter from './routes/index';
// import usersRouter from './routes/users';
import usersLocalRouter from './routes/usersLocal';
import sessionAuth from './authStrategy/session';
import localAuth from './authStrategy/local';
import authenticate from './authStrategy/authenticate';

const app = express();

const fileStore = FileStore(session);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('secret'));
// app.use(
//   session({
//     name: 'session-id',
//     secret: '1333-2323-3456-3457-2344',
//     resave: false,
//     saveUninitialized: false,
//     store: new fileStore(),
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(sessionAuth);

mongoose.connect('mongodb://localhost/monster_chat', { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/', indexRouter);

app.use('/users', usersLocalRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
