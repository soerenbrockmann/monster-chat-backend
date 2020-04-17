const localAuth = (req, res, next) => {
  console.log(req.user);

  if (!res.user) {
    const err = new Error('You are not authenticated!');
    err.status = 401;
    res.setHeader('WWW-Authenticate', 'Basic');
    return next(err);
  } else {
    next();
  }
};

export default localAuth;
