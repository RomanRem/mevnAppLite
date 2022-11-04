const express = require('express');
const clientRoute = express.Router();

// Client model
let ClientModel = require('../models/Client');

clientRoute.route('/').get((req, res) => {
  ClientModel.find((error, data,next) => {
     if (error) {
       return next(error);
     } else {
       res.json(data);
     }
   });
 });

 clientRoute.route('/create-client/').post((req, res) => {
  ClientModel.create(req.body, (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      
    }
  });
});

clientRoute.route('/edit-client/:id').get ((req, res) => {
  
  ClientModel.findById(req.params.id , (error, data, next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update client
clientRoute.route('/update-client/:id').post ((req, res) => {
   ClientModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data,next) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log('Client successfully updated!');
    }
  });
});

// Delete client
clientRoute.route('/delete-client/:id').delete ((req, res) => {
  ClientModel.findByIdAndRemove(req.params.id, (error, data,next) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});

module.exports = clientRoute;