const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    }
})

module.exports = mongoose.modle('User',noteSchema)