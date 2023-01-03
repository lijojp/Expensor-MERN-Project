import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
const app = express()
const PORT = 4000

app.use(cors())

app.get('/',(req,res)=>{
    res.send("hellow world")
})

await mongoose.connect(
    'mongodb+srv://bitfumes:bitfumes123@bitfumes-mern.mcu6ng2.mongodb.net/?retryWrites=true&w=majority'
    )
console.log("mongodb connected")


app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})  