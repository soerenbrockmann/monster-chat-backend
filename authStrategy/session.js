const sessionAuth = (req, res, next) => {
  console.log(req.session);

  if (!req.session.username) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      return next(err);
    }

    const auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];
    if (username === 'admin' && password === 'password') {
      req.session.username = 'admin';
      req.session.role = 'simple';
      next();
    } else {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      next(err);
    }
  } else {
    if (req.session.username === 'admin') {
      next();
    } else {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      next(err);
    }
  }
};

export default sessionAuth;
