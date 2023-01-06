import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import TransactionsApi from './routes/TransactionsApi.js'
import connect from './database/mongodb.js'

const app = express()
const PORT = 4000

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("hellow world")
})

app.use('/transaction',TransactionsApi)

await connect()


app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})  