const router = require('express').Router()
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller')

//set up GEt all and POST at /api/users

router 
.route('/')
.get(getAllUser)
.post(createUser)


//set up GET one, PUT, and DELETE at /api/users/:id

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)




//users/friends/:userid
router
.route('/friends/:userId').put(addFriend)


//users/friends
router.route('/friends/:userId/:friendId').delete(removeFriend)
// .put(addFriend)


// how to delete a users friend???
// router
// .route('/friends/:id/:friendId').put(removeFriend)


module.exports = router