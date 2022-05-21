const router = require('express').Router()
const { addThought, removeThought, addReaction, removeReaction, getThoughtById}= require('../../controllers/thought-controller')

router.route('/:id').get(getThoughtById)

router
.route('/:userId')
.post(addThought)


router
.route('/:userId/:thoughtId').put(addReaction).delete(removeThought)



router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction)
module.exports = router