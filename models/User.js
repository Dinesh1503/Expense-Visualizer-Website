const mongoose = require('mongoose')
const AutoIncemrent = require('mongoose-sequence')(mongoose)
const userSchema = new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    email :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    }
},
{
    timestamps: true
})

dataSchema.plugin(AutoIncemrent,{
    inc_field: 'ticket',
    id :'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('User',userSchema)