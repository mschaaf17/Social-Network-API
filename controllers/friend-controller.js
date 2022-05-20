const { User } = require('../models')


//adding a friend by putting in all of the user informtion such as username and email
const friendController = {
    addFriend({params, body}, res) {
        console.log(body)
        User.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$addToSet: {friends:_id}},
                {new: true}
            )
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with this id'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err=> res.json(err))
},

//remove friend
removeFriend({params}, res) {
    User.findOneAndDelete({_id: params.friendId})
    .then(deletedFriend => {
        if(!deletedFriend) {
            return res.status(404).json({message: 'no friend with that id'})
        }
        return User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'})
        }
        res.json(dbUserData)
    })
    .catch(err => res.json(err))
}

}


module.exports = friendController