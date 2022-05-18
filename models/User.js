const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: 'You need to provide a username.',
        trim: true,
        //unique
        //email
    },
    email:{
        type: String,
        required: true,
        //unique
        //must match a valid email address(look into mongoose matching validation)

    },
    thoughts: {
        //array of _id values referencing the thought model
    },
    friends: {
        //array of _id values referening the user model (self-refernece)
    }
})


// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const User = model('User', userSchema)

module.exports = User;