// Path :-  dms-frontend/src/App.jsx 

import {Routes , Route} from "react-router-dom"

import Login from "./pages/Login"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import Register from "./pages/Register"

// import Register from "./pages/Register"


// import Dashboard from "./pages/Dashboard"


function App() {
     return (
       <div className="min-h-screen bg-gray-50">
         <Routes>
           <Route path="/" element={<Login />} />
           <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route
             path="/profile"
             element={
               <ProtectedRoute>
                 <Profile />
               </ProtectedRoute>
             }
           />
         </Routes>
       </div>
     );
}


export default App