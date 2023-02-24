import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/TableBody";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/auth";

export default function Category() {
  const token = Cookies.get("token")
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  // function categoryName(id) {
  //   const category = user.categories.find((category) => category._id === id);
  //   return category ? category.label : "NA";
  // }

  // function formatDate(date) {
  //   return dayjs(date).format("DD MMM, YYYY");
  // }

  async function remove(id){

    const res = await fetch(`${process.env.REACT_APP_API_URL}/category/${id}`,{
      method : "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    if(res.ok){
      const _user = {
        ...user, categories: user.categories.filter((cat)=> cat._id !== id)
      }
      dispatch(setUser({ user: _user }))
    }
  }

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List Of Category
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.label}</TableCell>
                <TableCell align="center">{row.icon}</TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    // onClick={() => setEditTransaction(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => remove(row._id)}
                  >
                    <DeleteIcon />
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
