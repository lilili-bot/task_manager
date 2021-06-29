const express = require("express");
const router = express.Router()
const {getAllTasks, delTasks, updateTasks, createTasks,getTask} = require('../controllers/tasks')


router.route('/').get(getAllTasks).post(createTasks)
router.route('/:id').get(getTask).patch(updateTasks).delete(delTasks)
//router.route('/').get(updateTasks)
//router.route('/').get(createTasks)
//router.route('/').get(delTasks)


module.exports = router