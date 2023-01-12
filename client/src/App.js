import {useEffect, useState} from "react"
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm"
import TransactionsList from "./components/TransactionsList"
import Container from '@mui/material/Container';
// import { AppBar } from "@mui/material";



function App(){
  
  const [transactions, setTransactions] = useState([])
  const [editTransaction, setEditTransaction] = useState({})
  
  useEffect(()=>{
    fetchTransaction()
  },[])

  async function fetchTransaction() {
    const res = await fetch("http://localhost:4000/transaction")
    const {data} = await res.json()
    setTransactions(data)
  }
console.log(transactions)



  return <div>
    <AppBar/>
    
      <Container>
        <TransactionForm 
          fetchTransaction={fetchTransaction}
          editTransaction={editTransaction}
          />
        <TransactionsList 
          transactions={transactions}
          fetchTransaction={fetchTransaction}
          setEditTransaction={setEditTransaction}
          />
       </Container>
  </div>
}

export default App;
