import {useEffect, useState} from 'react';
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
import { create } from '@mui/material/styles/createTransitions';
import Cookies from 'js-cookie';
import Autocomplete from '@mui/material/Autocomplete'
// import { Box } from '@mui/system';
import  Box  from '@mui/material/Box';
import {useSelector, useDispatch} from 'react-redux'
import { setUser } from '../store/auth';

const InitialForm = {
    label: "",
    icons: "",
}

const icons = [ "User" ]

export default function CategoryForm({ editCategory }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const token = Cookies.get('token')
  const [form ,setForm] = useState({ InitialForm })
    
  useEffect(()=>{
    if(editCategory._id !== undefined){
      setForm(editCategory)
    }
  },[editCategory])

  function handleChange(e) {
    setForm({...form,[e.target.name]:e.target.value})
  }

  function handleDate(newValue) {
    setForm({...form, date:newValue})
  }
 
  async function handlesubmit(e) {
    e.preventDefault()
    const res = editCategory._id === undefined ? create(): update()
  }

  function reload(res) {
    if(res.ok){
      const _user = {
        ...user, categories: [ ...user.categories, {...form} ]
      }
      dispatch(setUser({user:_user}))
      setForm(InitialForm)
    }
  }
  
  async function create() {
    console.log(form)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category`,{
      method : "POST",
      body : JSON.stringify(form),
      headers:{
        "content-type": "application/json",
        'Authorization' : `Bearer ${token}`,
      },
    });
    const _user = {
      ...user,
      categories: [ ...user.categories, {...form}]
    }
    reload(res,_user);
  }
  async function update() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${editCategory._id}`,{
      method : "PATCH",
      body : JSON.stringify(form),
      headers:{
        "content-type": "application/json",
        'Authorization' : `Bearer ${token}`,
      },
    });
    const _user = {
        ...user,
        categories: user.categories.map((cat) => cat._id == editCategory._id ? form : cat)
      }
      reload(res,_user);
  }
  function getCategoryNameById() {
    return (
      user.categories.find((category) => category._id ===form.category_id) ?? ""
    )
  }

  return (
    <Card sx={{ minWidth: 275, marginTop:10 }}>
      <CardContent>
        <Typography variant="h6">
          Add New Category
        </Typography>
        <Box component="form" onSubmit={handlesubmit} sx={{display: 'flex'}}>
        <TextField 
           sx={{marginRight:5}}
           id="outlined-basic" 
           label="Label" 
           type="text"
           size='small'
           name="label" 
           variant="outlined" 
           value={form.label}
           onChange={handleChange}
           />
       
      <Autocomplete
        value={getCategoryNameById()}
        onChange={(event, newValue) => {
          setForm({...form, icon: newValue});
        }}
        id="icons"
        options={icons}
        sx={{ width: 200, marginRight:5 }}
        renderInput={(params) => <TextField {...params}
        size='small' label="Icons" />}
      />

      {editCategory._id !== undefined && (
      <Button type='submit' variant="secondary">Update</Button>)}
      
      {editCategory._id === undefined && (
      <Button type='submit' variant="contained">Submit</Button>)}
        
        </Box>
      </CardContent>
    </Card>
  );
}