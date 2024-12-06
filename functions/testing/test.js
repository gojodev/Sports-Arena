const bcrypt = require('bcrypt')

console.log(bcrypt.hashSync('admin', 5))