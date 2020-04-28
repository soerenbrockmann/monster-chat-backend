import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import passport from 'passport';
import mongoose from 'mongoose';
import cors from 'cors';

import indexRouter from './routes/index';
import usersLocalRouter from './routes/usersLocal';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/monster_chat', { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/api', indexRouter);

app.use('/api/users', usersLocalRouter);

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
