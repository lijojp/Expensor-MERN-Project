import {useEffect, useState} from "react"
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm"
// import { AppBar } from "@mui/material";



function App(){
  
  const [transaction, setTransaction] = useState([])
  
  useEffect(()=>{
    fetchTransaction()
  },[])

  async function fetchTransaction() {
    const res = await fetch("http://localhost:4000/transaction")
    const {data} = await res.json()
    setTransaction(data)
  }
console.log(transaction)



  return <div>
    <AppBar/>
    <TransactionForm fetchTransaction={fetchTransaction}/>
    
    <br/> 

    <section>
      <table>
        <thead>
          <th>Amount</th>
          <th>Description</th>
          <th>Date</th>
        </thead>
        <tbody>
          {transaction.map((trx)=>(
            <tr key={trx._id}>
            <td>{trx.amount}</td>
            <td>{trx.description}</td>
            <td>{trx.date}</td>
          </tr> 
          ))}
        </tbody>
      </table>
    </section>
  </div>
}

export default App;
