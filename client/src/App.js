import React from "react";
import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { getUser } from "./store/auth.js"
import Cookies from 'js-cookie';


function App(){
  const [isLoading, setIsLoading] = useState(true)
  
  const token = Cookies.get("token")
  const dispatch = useDispatch()

  async function fetchUser() {
    setIsLoading(true)
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    // console.log(res)

    if (res.ok){
      const user = await res.json()
      console.log(3)
      dispatch(getUser(user))
      
    }

    setIsLoading(false)

}

  useEffect(()=>{
    fetchUser()
  },[])

  if(isLoading){
        return <p>Loading...</p>
    }

  return <div>
    <AppBar/>
    <Outlet />
    {/* after rendering App, whatever is the component
     of the children (from index.js) will be rendered by Outlet */}
        
  </div>
}

export default App;
