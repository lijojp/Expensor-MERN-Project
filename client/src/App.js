import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";

function App(){
  
  return <div>
    <AppBar/>
    <Outlet />
    {/* after rendering App, whatever is the component
     of the children (from index.js) will be rendered by Outlet */}
        
  </div>
}

export default App;
