const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);

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
    next();
  } else {
    const err = new Error('You are not authenticated!');
    err.status = 401;
    res.setHeader('WWW-Authenticate', 'Basic');
    next(err);
  }
};

export default basicAuth;
