import React from "react";
import {useEffect, useState} from "react"
import TransactionForm from "../components/TransactionForm"
import TransactionsList from "../components/TransactionsList"
import Container from '@mui/material/Container';
import Cookies from 'js-cookie'
import TransactionChart from "../components/TransactionChart"

export default function Home() {

    const [transactions, setTransactions] = useState([])
    const [editTransaction, setEditTransaction] = useState({})
    
    useEffect(()=>{
      fetchTransaction()
    },[])
  
    async function fetchTransaction() {
      const token = Cookies.get('token')
      const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
        headers:{
          Authorization: `Bearer ${token}`
       }
      })
      const {data} = await res.json()
      setTransactions(data)
    }
    return(
     
        <Container>
          <TransactionChart data={transactions}/>
          
        <TransactionForm 
          fetchTransaction={fetchTransaction}
          editTransaction={editTransaction}
          />
        <TransactionsList 
          data={transactions}
          fetchTransaction={fetchTransaction}
          setEditTransaction={setEditTransaction}
          />
       </Container>
       
    )
}