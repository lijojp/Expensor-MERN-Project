import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import TransactionsApi from './routes/TransactionsApi.js'
import AuthApi from './routes/AuthApi.js'
import connect from './database/mongodb.js'
import passport from "passport";
import passportConfig from './config/passport.js'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 4000

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
passportConfig(passport)

app.get('/',(req,res)=>{
    res.send("hellow world")
})

app.use('/transaction',TransactionsApi)
app.use('/auth',AuthApi)

await connect()


app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})  