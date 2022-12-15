const mongoose = require('mongoose')
const AutoIncemrent = require('mongoose-sequence')(mongoose)
const userSchema = new mongoose.Schema({
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
},
{
    timestamps: true
})

userSchema.plugin(AutoIncemrent,{
    inc_field: 'ticket',
    id :'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('User',userSchema)