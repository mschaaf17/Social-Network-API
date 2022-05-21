const { Schema, model, Types} = require('mongoose')

const ReactionSchema = new Schema({
    //explanation of this??
    //there is an id with the reaction text defaulted?
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionText: {
        type: String,
        required: true,
        trim: true
    }
},
{
    toJSON: {

        //getters true?? apply to every query true?
        getters: true
    },
    //extra ids?
    id: false
})


const ThoughtSchema = new Schema({
    thoughtText: {
        type: String
    },
    reactions: [ReactionSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id: false
}
)

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})


const Thought = model('Thought', ThoughtSchema)
module.exports = Thought