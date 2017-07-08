exports.config = {
  development: {
    url: 'mongodb://localhost:27017/thesis'
  },
  production: {
    url: process.env.DB_URL
  }
}