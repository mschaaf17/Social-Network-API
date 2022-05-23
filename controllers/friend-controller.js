// const { User, Thought } = require('../models')


// //adding a friend by putting in all of the user informtion such as username and email
// const friendController = {
//     addFriend({params}, res) {
//         User.findOneAndUpdate(
//                 {_id: params.userId},
//                 {$addToSet: {friends: params.friendId}},
//                 {new: true, runValidators: true}
//             )
        
//         .then(dbUserData => {
//             if(!dbUserData) {
//                 res.status(404).json({message: 'no user found with this id'})
//                 return
//             }
//             res.json(dbUserData)
//         })
//         .catch(err=> res.json(err))
// },

// //remove friend
// removeFriend({params}, res) {
//     //find one and delete or update?
//     //userid or friend id?
//     User.findOneAndUpdate({_id: params.userId})
//     .then(deletedFriend => {
//         if(!deletedFriend) {
//             return res.status(404).json({message: 'no friend with that id'})
//         }
//         return User.findOneAndUpdate(
//             {_id: params.userId},
//             {$pull: {friends: params.friendId}},
//             {new: true}
//         )
//     })
//     .then(dbUserData => {
//         if(!dbUserData) {
//             res.status(404).json({message: 'No user found with this id'})
//         }
//         res.json(dbUserData)
//     })
//     .catch(err => res.json(err))
// }

// }


// module.exports = friendController