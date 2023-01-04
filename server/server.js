import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
const PORT = 4000

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("hellow world")
})

app.post('/transaction',(req,res)=>{
    console.log(req.body);
    res.send({message : "form submitted"})
})

await mongoose.connect(
    'mongodb+srv://bitfumes:bitfumes123@bitfumes-mern.mcu6ng2.mongodb.net/?retryWrites=true&w=majority'
    )
console.log("mongodb connected")


app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})  