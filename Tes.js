const {verify} = require('../helpers/jwt');
module.exports = (req, res, next) => {
  const token = req.headers.access_token;
  if (token) {
    try {
      const auth = verify(token);
      if (auth) {
        req.githubToken = auth.githubToken;
        next();
      } else {
        next({
          type: 'invalidToken'
        });
      }
    } catch (err) {
      next(err);
    }
  } else {
    next({
      type: "tokenNotProvided"
    });
  }
};
