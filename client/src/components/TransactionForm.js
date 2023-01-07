import {useState} from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const InitialForm = {
    amount: 0,
    description: " ",
    date: new Date()
}
export default function TransactionForm({ fetchTransaction }) {
  const [form ,setForm] = useState({ InitialForm })

  function handleChange(e) {
    setForm({...form,[e.target.name]:e.target.value})
  }

  function handleDate(newValue) {
    setForm({...form, date:newValue})
  }
 
  async function handlesubmit(e) {
    e.preventDefault()
    const res = await fetch("http://localhost:4000/transaction",{
      method : "POST",
      body : JSON.stringify(form),
      headers:{
        "content-type": "application/json",
      },
    });

    if(res.ok){
      setForm(InitialForm)
      fetchTransaction()
    }
  }

  return (
    <Card sx={{ minWidth: 275, marginTop:10 }}>
      <CardContent>
        <Typography variant="h6">
          Add New Transaction
        </Typography>
        <form onSubmit={handlesubmit}>
        <TextField 
           sx={{marginRight:5}}
           id="outlined-basic" 
           label="Amount" 
           size='small'
           name="amount" 
           variant="outlined" 
           value={form.amount}
           onChange={handleChange}
           />
        <TextField 
            sx={{marginRight:5}} 
            id="outlined-basic" 
            label="Description" 
            size='small' 
            name="description"
            variant="outlined" 
            value={form.description}
            onChange={handleChange}
            />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Date"
          inputFormat="DD/MM/YYYY"
          value={form.date}
          onChange={handleDate}
          renderInput={(params) => 
          <TextField 
            sx={{marginRight:5}} 
            size='small' 
            {...params} />}
        />    
      </LocalizationProvider>
      <Button type='submit' variant="contained">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}