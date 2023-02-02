import React from "react";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

export default function CheckAuth({children}) {
    const token = Cookies.get("token")
    console.log(token)
    return token ? children : <Navigate to='/login' replace={true}/>
}