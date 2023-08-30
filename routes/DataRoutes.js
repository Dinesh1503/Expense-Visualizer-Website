const express = require('express')
const router = express.Router()
const DataController = require('../controllers/DataController')

router.route('/')
.post(DataController.addData)
.delete(DataController.deleteData)

router.route('/total')
.get(DataController.getTotalOfUser)
.post(DataController.getAllData)

router.route('/total/day')
.get(DataController.getTotalOfUserByDay)

router.route('/total/month')
.get(DataController.getTotalOfUserByMonth)

router.route('/total/year')
.get(DataController.getTotalOfUserByYear)

module.exports = router