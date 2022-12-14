const e = require("express")
const express = require("express")
const req = require("express/lib/request")
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, '..','views','index.html'))
})



module.exports = router