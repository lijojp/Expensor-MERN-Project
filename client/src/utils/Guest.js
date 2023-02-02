import React from "react";
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

export default function Guest({children}) {
    const token = Cookies.get("token")
    // console.log(token)
    return ! token ? children : <Navigate to='/home' replace={true}/>
}