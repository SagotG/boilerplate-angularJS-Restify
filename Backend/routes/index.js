var fs = require("fs");
const restify = require("restify");
const errors = require("restify-errors");
const Todo = require("../models/todo");
var path = require("path");

module.exports = function(server) {
  server.post("/todos", (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    let data = req.body || {};

    let todo = new Todo(data);
    console.log(data);
    todo.save(function(err) {
      if (err) {
        console.error(err);
        return next(new errors.InternalError(err.message));
      }

      res.send(201);
      next();
    });
  });

  server.get("/todos", (req, res, next) => {
    Todo.apiQuery(req.params, async (err, doc) => {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      }

      res.send(doc);
      next();
      // return await SomePromise.work( req.parms.id );
    });
  });

  server.get("/todos/:id", (req, res, next) => {
    Todo.findOne({ _id: req.params.id }, async (err, doc) => {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      }

      res.send(doc);
      next();
      // return await SomePromise.work( req.parms.id );
    });
  });

  server.put("/todos/:id", (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    let data = req.body || {};

    if (!data._id) {
      data = Object.assign({}, data, { _id: req.params.id });
    }

    Todo.findOne({ _id: req.params.id }, (err, doc) => {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      } else if (!doc) {
        return next(
          new errors.ResourceNotFoundError(
            "The resource you requested could not be found."
          )
        );
      }

      Todo.update({ _id: data._id }, data, err => {
        if (err) {
          console.error(err);
          return next(new errors.InvalidContentError(err.errors.name.message));
        }

        res.send(200, data);
        next();
      });
    });
  });

  server.del("/todos/:todo_id", (req, res, next) => {
    Todo.remove({ _id: req.params.todo_id }, function(err) {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      }

      res.send(204);
      next();
    });
  });

  server.get("/render", (req, res, next) => {
    fs.readFile(__dirname + "/index.html", (err, data) => {
      if (err) {
        next(err);
        return;
      }
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(data);
      next();
    });
  });
};
