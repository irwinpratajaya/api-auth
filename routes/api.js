var express = require('express');
var router = express.Router();
var models = require('../models')
var controllers = require('../controllers/controllers')
const crypto = require('crypto');
var jwt = require('jsonwebtoken');


/* GET home page. */
// router.get('/users', function(req, res, next) {
//   res.send('hello world!');
// });

router.post('/signup', function(req, res, next) {
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone:req.body.phone,
    role: req.body.role
  }).then(function(result) {
    res.send('signed up')
  })
});


router.post('/signin', function(req, res, next) {
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
        // console.log(token);
      }
    } else {
      res.send(`unauthorized`)
    }
  })
})

// menampilkan seluruh data user
router.get('/users', controllers.get_users);

// menampilkan data user berdasarkan id
router.get('/users/:id', controllers.get_user_id);

// menambahkan data user
// router.post('/users', controllers.add_user);

// menghapus data user berdasarkan id
router.delete('/users/:id', controllers.delete_user_id);

// update data user berdasarkan id
router.put('/users/:id', controllers.update_user)


module.exports = router;
