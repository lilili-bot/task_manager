const Task = require('../models/Task')
const asyncWrapper = require('../middelWare/sync')
const {createCustomError} = require('../error/custom-error')
/* const getAllTasks = async (req,res)=>{
 try 
 {
  const tasks = await Task.find({})
  res.status(200).json({tasks:tasks, amount:tasks.length})
  //res.json({ success:true, data:{tasks, nbHits:tasks.length}})
 } catch (err) {
  res.status(500).json({message: err})
 }
}

const getTask = async (req,res)=>{
 //console.log(req)
 //console.log(req.body)
 console.log(req.params.id)
 try{
  const {id:taskID} = req.params
  const task = await Task.findOne({_id:taskID});
  if(!task){
   return res.status(404).json({msg:"No task with id", taskID})
  }
  res.status(200).json({task:task})
 } catch(e){res.status(500).json({msg:e})}
 
}

const createTasks = async (req, res)=>{
 //console.log(req)
 //console.log(req.body)
 try{
  const task = await Task.create(req.body)
  res.status(200).json({task})
  console.log('data is created')
 }catch(e){res.status(500).json({msg:e})}
}

const updateTasks = async (req, res)=>{
 
 try{
  const {id:taskID} = req.params
  const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{new:true, runValidators:true})

  if(!task){return res.status(404).json("task is not found: ", taskID)}
  res.status(200).json({task:task})
  console.log(req.body)
  console.log(req.params)
  console.log(req.params.id)
 }catch(e){res.status(500).json({msg:e})}
 
}

const delTasks = async (req,res)=>{
 try {
  const {id: taskID} = req.params
  const task = await Task.findOneAndDelete({_id:taskID})
  if(!task) {
   return res.status(404).json({msg:"No task with id", taskID})
  } 
  res.status(200).json({task})
 } catch(err){
  res.status(500).json({msg:err})
 }
} */

// another way of coding to avoid repeatation
const getAllTasks = asyncWrapper( async (req,res)=>{
   const tasks = await Task.find({})
  res.status(200).json({tasks:tasks, amount:tasks.length})
  //res.json({ success:true, data:{tasks, nbHits:tasks.length}})
 })   

const getTask = asyncWrapper(async (req,res, next)=>{
 //console.log(req)
 //console.log(req.body)
 //console.log(req.params.id) 
 const {id:taskID} = req.params
 const task = await Task.findOne({_id:taskID});
 if(!task){
  return next(createCustomError("error"))
  return res.status(404).json({msg:"No task with id", taskID})
 }
 res.status(200).json({task:task}) 
})

const createTasks = asyncWrapper(async (req, res)=>{
 //console.log(req)
 //console.log(req.body)
 
 const task = await Task.create(req.body)
 res.status(200).json({task})
 console.log('data is created')
 })

const updateTasks = asyncWrapper(async (req, res)=>{
 const {id:taskID} = req.params
 const task = await Task.findOneAndUpdate({_id:taskID}, req.body,{new:true, runValidators:true})
 if(!task){return res.status(404).json("task is not found: ", taskID)}
 res.status(200).json({task:task})
  //console.log(req.body)
  //console.log(req.params)
  //console.log(req.params.id) 
})

const delTasks = asyncWrapper(async (req,res)=>{ 
 const {id: taskID} = req.params
 const task = await Task.findOneAndDelete({_id:taskID})
 if(!task) {
  return res.status(404).json({msg:"No task with id", taskID})
 } 
 res.status(200).json({task}) 
})

module.exports = {getAllTasks,getTask, delTasks, updateTasks, createTasks}