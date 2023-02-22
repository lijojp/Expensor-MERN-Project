import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';


export default function TransactionsList({ transactions, fetchTransaction, setEditTransaction }) {

  async function remove(_id) {
    const token = Cookies.get('token')

    if(!window.confirm("are you sure"))return
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${_id}`,{
      method : "DELETE",
      headers : {
        'Authorization' : `Bearer ${token}`,
      }
    })
    if(res.ok){
      fetchTransaction()
      window.alert("Deleted")
    }
  }

  function formatDate(date) {
    return dayjs(date).format('DD MMM, YYYY')
  }

  return (
    <>
    <Typography sx={{marginTop:10}} variant="h6">List Of Transaction</Typography>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.amount}</TableCell>              
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{formatDate(row.date)}</TableCell>
              <TableCell align="center">
                 <IconButton color="primary" component="label" onClick={()=>setEditTransaction(row)}>
                   <EditIcon/>
                  </IconButton>
                  <IconButton color="primary" component="label" onClick={()=>remove(row._id)}>
                  <DeleteIcon/>
                 </IconButton>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
