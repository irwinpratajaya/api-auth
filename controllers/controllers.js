var models = require('../models');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
// var decoded = jwt.verify(req.headers.authentication, 'shhhhh');

var signup = function(req, res, next) {
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone:req.body.phone,
    role: req.body.role
  }).then(function(result) {
    res.send('signed up')
  })
}

var signin = function(req, res, next) {
  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then(function(user) {
    var token = jwt.sign({ name: user.name,role: user.role }, 'shhhhh');
    if(user) {
      let hmac = crypto.createHmac('sha512', user.salt)
                       .update(req.body.password)
                       .digest('hex')
      if(user.password == hmac) {
        res.send(token)
        console.log(token);
      }
    } else {
      res.send(`wrong email or password`)
    }
  })
}

// var get_users = function(req, res, next) {
//   var decoded = jwt.verify(req.headers.authentication, 'shhhhh');
//   // res.send(decoded)
//   if(decoded.role == "admin") {
//     models.User.findAll().then(function(results) {
//       // console.loge(results);
//       res.send(results)
//     })
//   } else {
//     res.send(`you are not authorized to access data as a user`)
//   }
// }

var get_users = function(req,res) {
  models.User.findAll().then(function(result) {
    res.send(result)
  })
}

var get_user_id = function(req, res, next) {
  var decoded = jwt.verify(req.headers.authentication, 'shhhhh');
  if (decoded.role) {
    models.User.findById(req.params.id).then(function(result) {
      res.send(result)
    })
  } else {
    res.send(`you are not authorized to access data`)
  }

}

var add_user = function(req, res, next) {
  var decoded = jwt.verify(req.headers.authentication, 'shhhhh');
  if(decoded.role == "admin") {
    models.User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }).then(function(results) {
      res.send(results)
    })
  } else {
    res.send(`you are not authorized to create user as a user`)
  }

}

var delete_user_id = function(req, res, next) {
  var decoded = jwt.verify(req.headers.authentication, 'shhhhh');
  if(decoded.role == "admin" ) {
    models.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.send(`user id ${req.params.id} deleted`)
    }).catch(function(err) {
      console.log(err);
    })
  } else {
    res.send(`you are not authorized to delete data as a user`)
  }

}

var update_user = function (req, res, next) {
  var decoded = jwt.verify(req.headers.authentication, 'shhhhh');
  if (decoded.role) {
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
} else {
  res.send(`you are not authorized to update data`)
}
}

module.exports = {
  signup,
  signin,
  get_users,
  get_user_id,
  add_user,
  delete_user_id,
  update_user
}
