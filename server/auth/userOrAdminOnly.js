module.exports = (req, res, next) => {
  if (
    req.user &&
    (req.user.type === 'admin' || req.user.id === +req.params.userId)
  ) {
    next();
  } else {
    const err = new Error('Unauthorized access');
    err.status = 401;
    next(err);
  }
};
