const cookieAuth = (req, res, next) => {
  // console.log('Cookies: ', req.cookies);

  // // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies);

  // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true, signed: true });

  if (!req.signedCookies.username) {
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
      res.cookie('username', 'admin', { signed: true });
      next();
    } else {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      next(err);
    }
  } else {
    if (req.signedCookies.username === 'admin') {
      next();
    } else {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      res.setHeader('WWW-Authenticate', 'Basic');
      next(err);
    }
  }
};

export default cookieAuth;

// 1. Kein Cookie vorhanden -> unauthenticated -> Frag nach credentials -> speicher username im Cookie
