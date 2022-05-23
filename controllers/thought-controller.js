const { Thought, User } = require('../models')

//do i need a route for get request? in the route
const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no thought with this id'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    //add thought to user
    addThought({params, body}, res){
        console.log(body)
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true}
            )
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'})
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.json(err))
},

//update a thought
updateThought({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .then(thoughtData => {
        if(!thoughtData) {
            res.status(404).json({message: 'no thought found with this id'})
            return
        }
        res.json(thoughtData)
    })
    .catch(err => res.status(400).json(err))
},

//add reaction to thought
addReaction({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId},
        { $push: { reactions: body}},
        //do i need validators for required?
        {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'no user found with this id'})
                return
            }         
            res.json(dbUserData)   
        })
        .catch(err => res.json(err))
},

//remove thought
removeThought({ params }, res) {
    Thought.findOneAndDelete({_id: params.thoughtId})
    .then(deletedThought => {
        if(!deletedThought) {
            return res.status(404).json({message: 'No thought with this id'})
        }
        return User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {thoughts: params.thoughtId}},
            {new: true}
        )
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => res.json(err))

},

//remove reaction
removeReaction({params}, res) {
    Thought.findOneAndUpdate(
        {_id: params.thoughtId},
        //do i need a reachid schema becuase of this?
        {$pull: { reactions: {reactionId: params.reactionId}}},
        {new: true}
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err))
}

}


module.exports = thoughtController