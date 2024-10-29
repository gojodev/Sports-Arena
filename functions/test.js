const bcrypt = require('bcrypt')


let hash = bcrypt.hashSync("First3 Last3", 5)

console.log(hash)