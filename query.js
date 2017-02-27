var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
var decoded = jwt.verify(token, 'shhhhh');

console.log(token);
console.log(decoded);
