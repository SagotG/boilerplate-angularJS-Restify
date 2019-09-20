module.exports = {
  name: "API",
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  base_url: process.env.BASE_URL || "http://localhost:5000",
  db: {
    uri: "mongodb://mongo:27017/api"
  }
};
