const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'You need to provide a username.',
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },

    //this can be written as the second practice in activites?
    thoughts: [
        //array of _id values referencing the thought model
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
],
    friends: [
        //array of _id values referening the user model (self-reference)
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
)



// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendsCount').get(function() {
    return this.friends.length
})


const User = model('User', UserSchema)

module.exports = User;