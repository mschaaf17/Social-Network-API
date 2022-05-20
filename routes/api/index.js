const router = require('express').Router()
const userRoutes = require('./user-routes')
const thoughtRoutes = require('./thought-routes')
const friendRoutes = require('./friend-routes')

//add prefix of /users to routes created in user-routes.js
router.use('/users', userRoutes)
router.use('/thoughts', thoughtRoutes)
router.use('/friends', friendRoutes)

module.exports = router