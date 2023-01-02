import express from 'express'
const app = express()
const PORT = 4000

app.get('/',(req,res)=>{
    res.send("hellow world")
})

app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})