const User = require('../models/User')
const Data = require('../models/Data')
const asyncHandler = require('express-async-handler')

const getAllData = asyncHandler(async (req,res) => {
    const data = await Data.find().lean()
    if(!data?.length)
    {
        res.status(400).json({message:`No Data Available`})
    }
    res.json(data)
})

const AddData = asyncHandler(async (req,res) => {
    const {user, value} = req.body

})