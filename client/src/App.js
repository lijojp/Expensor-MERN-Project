import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getUser } from "./store/auth.js"

function App(){
  
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUser())
  },[])
  console.log(auth);
  return <div>
    <AppBar/>
    <Outlet />
    {/* after rendering App, whatever is the component
     of the children (from index.js) will be rendered by Outlet */}
        
  </div>
}

export default App;
