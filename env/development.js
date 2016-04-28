var port = 1337;

module.exports = {
  port: port,
  db: 'mongodb://localhost/d2rAngular',
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
};