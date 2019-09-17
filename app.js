/**
 * Module Dependencies
 */
const config = require("./config");
const restify = require("restify");
const mongoose = require("mongoose");
const restifyPlugins = require("restify-plugins");

/**
 * Initialize Server
 */
const server = restify.createServer({
  name: config.name,
  version: config.version
});

/**
 * Middleware
 */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
 * Start Server, Connect to DB & Require Routes
 */
async function runDB() {
  mongoose.Promise = global.Promise;
  await mongoose.model("api", new mongoose.Schema({ name: String }));

  console.log(config.db.uri);
  // await mongoose.connect(config.db.uri, { useUnifiedTopology: true })
  setTimeout(() => {
    mongoose
      .connect(config.db.uri, { useUnifiedTopology: true })
      .then(() => {
        console.log("connected");
      })
      .catch(err => {
        console.log("Error on connect");
        console.info(err);
      });
  }, 3000);
}
server.listen(config.port, () => {
  runDB().catch(err => {
    console.log("Error on connect");
    console.info(err);
    process.exit();
  });
  const db = mongoose.connection;

  db.on("error", err => {
    console.error(err);
    process.exit(1);
  });

  db.once("open", () => {
    require("./routes")(server);
    console.log(`Server is listening on port ${config.port}`);
  });
});
