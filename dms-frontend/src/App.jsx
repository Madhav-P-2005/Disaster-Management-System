import {Routes , Route} from "react-router-dom"

import Login from "./pages/Login"
import Profile from "./pages/profile"

// import Register from "./pages/Register"


// import Dashboard from "./pages/Dashboard"


function App() {
      return(
        <>
        <div className="flex flex-col items-center justify-center h-screen">
             <Routes className="flex flex-col items-center justify-center h-screen">
                  <Route path="/" element={<Login/>} />
                  <Route path="/profile" element={<Profile/>} />
                  {/* <Route path="/register"
                    element={<Register/>}
                  /> */}
                  {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
             </Routes>
        </div>

        </>
      )
}


export default App