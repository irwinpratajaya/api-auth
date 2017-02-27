const crypto = require('crypto');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },

    hooks: {
      beforeCreate: function(pwd, option) {
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var secret = '';
        for( var i=0; i < 5; i++ ){
            secret += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }

        const hashpassword = crypto.createHmac('sha512', secret)
                           .update(pwd.password)
                           .digest('hex');

        pwd.password = hashpassword
        pwd.salt = secret
      }
    }
  });
  return User;
};
