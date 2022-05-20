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
    }



}


module.exports = userController