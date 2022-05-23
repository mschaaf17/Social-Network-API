const { User } = require('../models')

const userController = {
    //get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-_v'
        })
        .select('-_v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status.json(err)
        })
    },

//get one user by id
getUserById({params}, res) {
    User.findOne({_id: params.id})
    .populate({
        path: 'thoughts',
        select: '-_v'
    })
    .select('-_v')
    .then(dbUserData => {
        //if no user is found, send 404
        if(!dbUserData) {
            res.staus(404).json({message:'No user found with this id!'})
            return
        }
        res.json(dbUserData) 
    })
    .catch(err => {
        console.log(err)
        res.status(400).json(err)
    })
    },

    //create a user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },

    //update a user
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({_id: params.id }, body, {new: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },

    //delete a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message: 'No user found with this id'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },
    //adding a friend by putting in all of the user informtion such as username and email
    addFriend({params}, res) {
        User.findOneAndUpdate(
                {_id: params.userId},
                {$addToSet: {friends: params.friendId}},
                {new: true, runValidators: true}
            )
        
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
    //find one and delete or update?
    //userid or friend id?
    User.findOneAndUpdate(
        {_id: params.userId},
        {$pull: {friends: params.friendId}},
        {new: true}
        )

        // User.findOneAndDelete({_id: params.friendId})
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



module.exports = userController