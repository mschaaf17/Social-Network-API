const router = require('express').Router()
const { getAllThoughts, addThought, updateThought, removeThought, addReaction, removeReaction, getThoughtById}= require('../../controllers/thought-controller')


//get thought by id
router.route('/:id').get(getThoughtById)

//add a thought to a users
router
.route('/:userId')
.post(addThought)

//get all thoughts
router.route('/').get(getAllThoughts)

router.route('/:id').put(updateThought)



//delete a thought, add a reaction, update thought
router
.route('/:userId/:thoughtId')
// .put(updateThought)
.put(addReaction)
.delete(removeThought)


//delete a reaction 
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction)
module.exports = router