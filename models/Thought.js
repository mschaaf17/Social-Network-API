const { Schema, model, Types} = require('mongoose')
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: 'You need to provide a username.'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    },
    //extra ids
    id: false
})


const ThoughtSchema = new Schema({
    username: {
        type: String,
        required: 'You need your username.',
        trim: true
    },
    thoughtText: {
        type: String,
        required: 'You need to provide a thought',
        minLength: 1,
        maxLength: 280
        
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: createdAtVal => dateFormat(createdAtVal)
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