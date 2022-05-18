const router = require('express').Router()

//import all of the api routes from /api/index.js (now need for index.js though since its implied)
const apiRoutes = require('./api')

//add prefix of /api to all of the api routes imported from the api directory
router.use('/api', apiRoutes)
//html routes???

router.use((req, res)=> {
    res.status(404).send('<h1>404 Error!</h1>')
})

module.exports = router