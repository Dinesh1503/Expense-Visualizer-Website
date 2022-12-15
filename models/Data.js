const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    value: {
        type:String,
        required:true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Data',dataSchema)