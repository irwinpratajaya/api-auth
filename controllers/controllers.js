var models = require('../models');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');

var get_users = function(req, res, next) {
  var decoded = jwt.verify(req.headers.authentication, 'shhhhh');
  // res.send(decoded)
  if(decoded.role == "admin") {
    models.User.findAll().then(function(results) {
      // console.log(results);
      res.send(results)
    })
  } else {
    res.send(`you are not authorized to access data as a user`)
  }
  // res.send(req.headers.authentication)
}

var get_user_id = function(req, res, next) {
  models.User.findById(req.params.id).then(function(result) {
    res.send(result)
  })
}

var add_user = function(req, res, next) {
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }).then(function(results) {
    res.send(results)
  })
}

var delete_user_id = function(req, res, next) {
  models.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(results) {
    res.send(`user id ${req.params.id} deleted`)
  }).catch(function(err) {
    console.log(err);
  })
}

var update_user = function (req, res, next) {
  models.User.update({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  },
  {
  where: {
    id: req.params.id
  }
}).then(function(result) {
  res.send(`data has been updated`)
})
}

module.exports = {
  get_users,
  get_user_id,
  add_user,
  delete_user_id,
  update_user
}
