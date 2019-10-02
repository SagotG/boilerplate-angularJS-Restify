var fs = require("fs");

const restify = require("restify");
const errors = require("restify-errors");
const Campaigns = require("../models/campaign");
var path = require("path");
var json2xls = require('json2xls');

module.exports = function (server) {
  server.post("/campaigns", (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    let data = req.body || {};

    let campaign = new Campaigns(data);
    console.log(data);
    campaign.save(function (err) {
      if (err) {
        console.error(err);
        return next(new errors.InternalError(err.message));
      }

      res.send(201, JSON.stringify({ status: "success", message: "Campagne créé avec succès" }));
      next();
    });
  });

  server.get("/campaigns", (req, res, next) => {
    Campaigns.apiQuery(req.params, async (err, doc) => {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      }

      res.send(doc);
      next();
      // return await SomePromise.work( req.parms.id );
    });
  });

  server.get("/campaigns/:id", (req, res, next) => {
    Campaigns.findOne({ _id: req.params.id }, async (err, doc) => {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      }

      res.send(doc);
      next();
      // return await SomePromise.work( req.parms.id );
    });
  });

  server.put("/campaigns/:id", (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    let data = req.body || {};

    if (!data._id) {
      data = Object.assign({}, data, { _id: req.params.id });
    }

    Campaigns.findOne({ _id: req.params.id }, (err, doc) => {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      } else if (!doc) {
        return next(
          new errors.ResourceNotFoundError(
            "Cette resource ne peut être trouvé."
          )
        );
      }

      Campaigns.update({ _id: data._id }, data, err => {
        if (err) {
          console.error(err);
          return next(new errors.InvalidContentError(err.errors.name.message));
        }

        res.send(200, data);
        next();
      });
    });
  });

  server.del("/campaigns/:campaign_id", (req, res, next) => {
    Campaigns.remove({ _id: req.params.campaign_id }, function (err) {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      }

      res.send(204);
      next();
    });
  });


  server.get("/render", (req, res, next) => {
    var json = {
      foo: 'bar',
      qux: 'moo',
      poo: 123,
      stux: new Date()
    }

    //export only the field 'poo'
    var xls = json2xls(json, {
      fields: ['poo']
    });

    //export only the field 'poo' as string
    var xls = json2xls(json, {
      fields: { poo: 'string' }
    });

    let file = fs.writeFileSync('data.xlsx', xls, 'binary');
    res.send({
      code: 200
    }),
    res.write(file)
    next();
  });

};
