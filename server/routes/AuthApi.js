import {Router} from 'express'
import Transaction from '../models/Transaction.js';
import router from './TransactionsApi.js';

router.post('/register',(req,res)=>{
    res.json({'message':"user is created"})
})

export default router;