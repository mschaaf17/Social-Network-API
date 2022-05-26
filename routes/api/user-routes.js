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



router 
.route('/')
.get(getAllUser)
.post(createUser)



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





module.exports = router