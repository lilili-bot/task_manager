const express = require('express');
const app = express();
const port = 3000;
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
const notFound = require('./middelware/notfound')
const errorHandlerMiddleware = require('./middelware/error-handler')
require('dotenv').config()
// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(errorHandlerMiddleware)

// route

app.use('/api/v1/tasks', tasks)
app.use(notFound)



const start = async () =>{
 try {
  await connectDB(process.env.MONGO_URI)
  app.listen(port,()=>{
  console.log('the server is lisening to port 3000')
})
 } 
  catch(error) {console.log(error)}
} 

start()



