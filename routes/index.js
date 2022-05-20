const router = require('express').Router()

//import all of the api routes from /api/index.js (no need for index.js though since its implied)
const apiRoutes = require('./api')

//add prefix of /api to all of the api routes imported from the api directory
router.use('/api', apiRoutes)
//html routes???



//do you need this without html?
router.use((req, res)=> {
    res.status(404).send('<h1>404 Error!</h1>')
})

module.exports = router