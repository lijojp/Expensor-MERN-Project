import {useState} from "react"

function App(){
  const [form ,setForm] = useState({
    amount: 0,
    description: " ",
    date: " "
  })

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
    const data = await res.json()
    console.log(data)
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
          <tr>
            <td>1</td>
            <td>asdfa</td>
            <td>1/2/22</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
}

export default App;
