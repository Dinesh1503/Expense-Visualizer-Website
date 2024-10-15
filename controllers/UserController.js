const User = require('../models/User')
const Data = require('../models/Data')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc GET all Users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req,res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length)
    {
        return res.status(400).json({message:"No Users Found"})
    }
    res.json(users)

})

// const verify_user = asyncHandler(async (req,res) => {
//     const {username,password} = req.body
//     if(!username || !password)
//     {
//         return res.status(400).json({message:"Enter All Fields", success:false})
//     }

//     const hashedPwd = await bcrypt.hash(password,10)
//     const user = await User.findOne({username,hashedPwd}).lean().exec()

//     console.log(user);

//     if(!user)
//     {
//          return res.status(400).json({message: `User not found`,sucess:false})
//     }
//     else
//     {
//         return res.status(200).json({message: `User Verified`, success:true})
//     }
// })


const verify_user = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Enter All Fields", success: false });
    }

    const user = await User.findOne({ username }).lean().exec();

    if (!user) {
        return res.status(400).json({ message: "User not found", success: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid Password", success: false });
    } else {
        return res.status(200).json({ message: "User Verified", success: true });
    }
});



// @desc Create New User
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req,res) => {
    const {username,email,password} = req.body

    if(!username || !password || !email)
    {
        return res.status(400).json({message:"Enter All Fields"})
    }

    //Check for Duplicate
    const duplicate = await User.findOne({username}).lean().exec()

    if(duplicate){
        return res.status(400).json({message: "User already exists enter new Username"})
    }

    const hashedPwd = await bcrypt.hash(password,10) // salt rounds
    const userObject = {username,email,"password":hashedPwd}
    const user = await User.create(userObject)   
    if(user)
    {
        res.status(201).json({message:`New User ${username} created`, success:true})
    }
    else
    {
        res.status(404).json({message: `Invalid User Data recieved`})
    }

})


// @desc Update User
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req,res) => {
    const {id, username, email, password} = req.body
    if(!id || !username || !email || !password)
    {
        return res.status(400).json({message: `All fields are required`})
    }

    const user = await User.findById(id).exec()
    // check for duplicate

    const duplicate = await User.findOne({username}).lean().exec()
    //Allow Updates to the original User
    if(duplicate && duplicate?._i.toString() !== id){
        return res.status(409).json({message: `Duplicate username`})
    }

    user.username = username
    user.email = email
    user.password = password

    if(password){
        //Hash Password
        user.password = await bcrypt.hash(password,10) // salt rounds
    }

    const updatedUser = await user.save()
    res.json({message: `${updatedUser.username} Updated`})
})

// @desc Delete User
// @route DELETE /users
// @access Private

const deleteUser = asyncHandler(async (req,res) => {

    const {id} = req.body
    if(!id)
    {
        return res.status(400).json({message: `User ID required`})
    }
    const user = await User.findById(id).exec()
    if(!user){
        return res.status(400).json({message: `User not found`})
    }
    
    const user_result = await user.deleteOne() 

    try
    {
        const user_data = await Data.findById(id).exec()
        user_data.deleteOne()
        const reply = `User ${user_result.username} with ID ${user_result._id} and data deleted`
        res.json(reply)
    }
    catch(err)
    {
        console.log(err)
        const reply = `User ${user_result.username} with ID ${user_result._id} has no data deleted`
        res.json(reply)
    }

})

module.exports = {
    getAllUsers,
    verify_user,
    createNewUser,
    updateUser,
    deleteUser
}