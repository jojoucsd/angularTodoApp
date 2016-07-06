var port = process.env.PORT;

module.exports = {
  port: port,
  db: process.env.MONGODB_URI || process.env.MONGODB_URI || 'mongodb://heroku_j36tb2km:8211sa0l8ijti2vic56mgm5ttt@ds011409.mlab.com:11409/heroku_j36tb2km',
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
};