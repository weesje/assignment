module.exports = function (mongoose) {
  var express = require('express');
  var router = express.Router();

  var mongoCar = require("../model/car")(mongoose);

  router.route('/:id')
    .get(function (req, res) {
      var response = {};
      
      var whereArr = Object.keys(req.query);
      var where = {_id : req.params.id};
      whereArr.filter(function(value) {
        return value !== "fields" && value !== "limit" && value !== "offset";
      }).forEach( function(element, index) {
        where[element] = req.query[element];
      });

      var query = mongoCar.find(where);

      if (req.query.fields) {
        query.select(req.query.fields.split(',').join(' '));
      }
      if (req.query.limit) {
        query.limit(req.query.limit);
      }
      if (req.query.offset) {
        query.skip(req.query.offset);
      }
      query.exec(function (err, data) {
        if (err) {
          response = { "error": true, "message": err};
        }
        else {
          response = {"error": false, "message": data};
        }
        res.json(response);
      })
    })

    .delete(function (req, res) {
      var response = {};
      
      mongoCar.remove({_id : req.params.id}, function (err, removed) {
        if (err) {
          response = { "error": true, "message": err};
        }
        else {
          response = {"error": false, "message": "Succesfully removed"};
        }
        res.json(response);
      })
    })

    .put(function (req, res) {
      var response = {};
      
      mongoCar.findById(req.params.id, function (err, car) {
        if (err) {
          response = { "error": true, "message": err};
          res.json(response);
          return;
        }
        car.color = req.query.color || car.color;
        car.type = req.query.type || car.type;
        car.door = req.query.door || car.door;
        car.engine = req.query.engine || car.engine;
        //data.extra = req.query.extra;
        car.save(function (err) {
          if (err) {
            response = { "error": true, "message": err};
          }
          else {
            response = {"error": false, "message": "The " + req.body.type + " type car saved"};
          }
          res.json(response); 
        })    
      })
    });

  router.route('')
    .get(function (req, res) {
      var response = {};
      console.log(req.query);
      
      var whereArr = Object.keys(req.query);
      var where = {};
      whereArr.filter(function(value) {
        return value !== "fields" && value !== "limit" && value !== "offset";
      }).forEach( function(element, index) {
        where[element] = req.query[element];
      });

      console.log(where);

      var query = mongoCar.find(where);

      if (req.query.fields) {
        query.select(req.query.fields.split(',').join(' '));
      }
      if (req.query.limit) {
        query.limit(req.query.limit);
      }
      if (req.query.offset) {
        query.skip(req.query.offset);
      }
      query.exec(function (err, data) {
        if (err) {
          response = { "error": true, "message": "error occured"};
        }
        else {
          response = {"error": false, "message": data};
        }
        res.json(response);
      })
    })

    .post(function (req, res) {
      var db = new mongoCar();
      var response = {};
      db.color = req.query.color;
      db.type = req.query.type;
      db.door = req.query.door;
      db.engine = req.query.engine;
      //db.extra = req.query.extra;
      db.save(function (err) {
        if (err) {
          response = { "error": true, "message": err};
        }
        else {
          response = {"error": false, "message": "The " + req.body.type + " type car saved"};
        }
        res.json(response); 
      })
    });

  return router;
}