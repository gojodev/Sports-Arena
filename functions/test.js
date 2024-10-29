const bcrypt = require('bcrypt')

let hash = bcrypt.hashSync('member', 5)
console.log(hash) // output is : $2b$05$lRPUzg6wOkQs4b93BvQpGebWQUGUyULH7t5PGwVU09/upfNHrLeVy


// $2b$05$Yl4G2jizNe0CdEb7jqTEVOEBwhPOid4lYRkcDzQQJAeTLrnYYpsIi
// $2b$05$pOayBiURli75wDqkuCJck.bgnT0PlD4pyby.wdE9RiND1zWyGJcTi