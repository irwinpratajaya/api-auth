var jwt = require('jsonwebtoken');

// module.exports = {}
function authUser (req,res,next) {
  var auth = req.headers.authentication

  if (auth != undefined) {
    jwt.verify(auth, 'shhhhh', function(err,decoded) {
      if (err) {
        res.send(err)
      } else {
        req.User = decoded.name
        next()
      }
    });
  } else {
    res.send(`you are not authorize`)
  }
}

function authAdmin (req, res ,next) {
  // console.log(req.headers);
  var auth = req.headers.authentication

  if (auth != undefined) {
    jwt.verify(auth, 'shhhhh', function(err,decoded) {
      if (err) {
        res.send(err)
      } else {
        req.User = decoded.name
        if(decoded.role == "admin") {
          next()
        } else {
          res.send(`you dont have any authorize to access.`)
        }
      }
    });
  } else {
    res.send(`you are not authorize`)
  }
}

module.exports = {
  User: authUser,
  Admin: authAdmin
}
