import {useEffect, useState} from "react"

const InitialForm = {
    amount: 0,
    description: " ",
    date: " "
}

function App(){
  const [form ,setForm] = useState({ InitialForm })

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

  function handleInput(e) {
    // console.log(e.target.value)
    setForm({...form,[e.target.name]:e.target.value})
  }

  async function handlesubmit(e) {
    e.preventDefault()
    // console.log(form)
    const res = await fetch("http://localhost:4000/transaction",{
      method : "POST",
      body : JSON.stringify(form),
      headers:{
        "content-type": "application/json",
      },
    });
    // const data = await res.json()
    // console.log(data)
    if(res.ok){
      setForm(InitialForm)
      fetchTransaction()
    }
  }
 
  return <div>
    <form onSubmit = {handlesubmit}>
      <input type="number" name="amount" value={form.amount} onChange={handleInput} placeholder="Enter transaction amount"/>
      <input type="text" name="description" value={form.description} onChange={handleInput} placeholder="Enter transaction details"/>
      <input type="date" name="date" value={form.date} onChange={handleInput}/>
      <button type="submit">Submit</button>
    </form>

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
