const User = require('../models/User')
const Data = require('../models/Data')
const asyncHandler = require('express-async-handler')
const dayjs = require('dayjs')

const getAllData = asyncHandler(async (req,res) => {
    const {username} = req.body
    if(!username)
    {
        res.status(404).json({message:"Username Required"})
    }
    const user = await User.find({username:username}).exec()
    const data = await Data.find({user:user}).exec()

    // if(!data?.length)
    // {
    //     res.status(400).json({message:`No Data Available`})
    // }

    if(!data?.length)
    {
        return res.status(400).json({message:"No Data Found"})
    }   
    // const dataWithUser = await Promise.all(data.map(async (data) => {
    //     const user = await User.findById(data.user).lean().exec()
    //     return { ...data, username: user.username }
    // }))

    res.json(data)
})

const getTotalOfUserByDay = asyncHandler(async (req,res) => {
    const {username,month,year,day} = req.body
    if(!username || ! month || !year || !day)
    {
        res.status(404).json({message:"All fields Required"})
    }
    const user = await User.find({username:username}).exec()
    if(!user)
    {
        res.status(400).json({message:"User not found"})
    }

    const data = await Data.find({user:user}).exec()
    
    if(!data?.length){
        return res.status(400).json({message:"No Data Found"})
    }
    else{
        var total = 0
        var table = [];
        data.forEach(element => {
            var date = element["date"].split("-")
            if(date[0] == year && date[1] == month && date[2] == day)
            {
                total = total + parseFloat(element["value"])
                table.push({'date':element["date"],"value":element["value"]});
            }           
        });
        res.status(200).json({"total":total,"table":table})
    }

})

const getTotalOfUserByMonth = asyncHandler(async (req,res) => {
    const {username,month,year} = req.body
    if(!username || ! month || !year)
    {
        res.status(404).json({message:"All fields Required"})
    }
    const user = await User.find({username:username}).exec()
    if(!user)
    {
        res.status(400).json({message:"User not found"})
    }

    const data = await Data.find({user:user}).exec()
    
    if(!data?.length){
        return res.status(400).json({message:"No Data Found"})
    }
    else{
        var total = 0
        var table = [];
        data.forEach(element => {
            var date = element["date"].split("-")
            console.log(date[0]," ",date[1])
            if(date[0] == year && date[1] == month)
            {
                total = total + parseFloat(element["value"])
                table.push({'date':element["date"],"value":element["value"]});
            }           
        });
        res.status(200).json({"total":total,"table":table})
    }

})

const getTotalOfUserByYear = asyncHandler(async (req,res) => {
    const {username,month,year,day} = req.body
    if(!username || !year)
    {
        res.status(404).json({message:"All fields Required"})
    }
    const user = await User.find({username:username}).exec()
    if(!user)
    {
        res.status(400).json({message:"User not found"})
    }

    const data = await Data.find({user:user}).exec()
    
    if(!data?.length){
        return res.status(400).json({message:"No Data Found"})
    }
    else{
        var total = 0
        var table = [];
        data.forEach(element => {
            var date = element["date"].split("-")
            if(date[0] == year)
            {
                total = total + parseFloat(element["value"])
                table.push({'date':element["date"],"value":element["value"]});
            }           
        });
        res.status(200).json({"total":total,"table":table});
    }

})

const getTotalOfUser = asyncHandler(async (req,res) => {
    const {username} = req.body
    if(!username)
    {
        res.status(404).json({message:"Username Required"})
    }
    const user = await User.find({username:username}).exec()
    if(!user)
    {
        res.status(400).json({message:"User not found"})
    }

    const data = await Data.find({user:user}).exec()
    
    if(!data?.length){
        return res.status(400).json({message:"No Data Found"})
    }
    else{
        var total = 0 
        data.forEach(element => {
        total = total + parseFloat(element["value"])
        });
        res.status(200).json({"total":total})
    }
 }) 

const addData = asyncHandler(async (req,res) => {
    const {username, value, date} = req.body
    if (!username || !value) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await User.findOne({username}).lean().exec()
    if(!user)
    {
        res.status(400).json({message:`User not found`})
    }

    if(!date){
        const date = dayjs()
        const dataObject = {user:user,value:value,date:date.format("YYYY-MM-DD").toString()}
        const data = await Data.create(dataObject)
        if(data)
        {
            return res.status(201).json({ message: 'Data Added' })
        } else {
            return res.status(400).json({ message: 'Invalid Data received' })
        }
    }
    else{
        const dataObject = {user:user,value:value,date:date}
        const data = await Data.create(dataObject)
        if(data)
        {
            return res.status(201).json({ message: 'Data Added' })
        } else {
            return res.status(400).json({ message: 'Invalid Data received' })
        }
    }
    

})

const deleteData = asyncHandler(async (req,res) => {
    const {username,value} = req.body

    if(!username || !value)
    {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await User.findOne({username}).lean().exec()
    if(!user)
    {
        res.status(400).json({message:`User not found`})
    }
    const data = await Data.findOneAndDelete({user:user,value:value}).exec()
    
    if(data)
    {
        return res.status(201).json({ message: 'Data Deleted' })
    } else {
        return res.status(400).json({ message: 'No Data to Delete Data, all data deleted' })
    }

})

module.exports = {
    getAllData,
    getTotalOfUser,
    getTotalOfUserByDay,
    getTotalOfUserByMonth,
    getTotalOfUserByYear,
    addData,
    deleteData
}