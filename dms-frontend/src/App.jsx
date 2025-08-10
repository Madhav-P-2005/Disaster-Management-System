// Path :-  dms-frontend/src/App.jsx 

import {Routes , Route} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from './pages/Profile';
import IncidentReport from './pages/IncidentReport';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import ManageIncidents from './pages/ManageIncidents';
import LandingPage from './pages/LandingPage';
import AuthorityDashboard from './pages/AuthorityDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
     return (
       <div className="min-h-screen bg-gray-50">
         <Routes>
           <Route path="/" element={<LandingPage />} />
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
           <Route
             path="/report-incident"
             element={
               <ProtectedRoute>
                 <IncidentReport />
               </ProtectedRoute>
             }
           />
           <Route
             path="/dashboard"
             element={
               <ProtectedRoute>
                 <Dashboard />
               </ProtectedRoute>
             }
           />
           <Route
             path="/edit-profile"
             element={
               <ProtectedRoute>
                 <EditProfile />
               </ProtectedRoute>
             }
           />
           <Route
             path="/manage-incidents"
             element={
               <ProtectedRoute>
                 <ManageIncidents />
               </ProtectedRoute>
             }
           />
           <Route
             path="/authority-dashboard"
             element={
               <ProtectedRoute>
                 <AuthorityDashboard />
               </ProtectedRoute>
             }
           />
           <Route
             path="/government-dashboard"
             element={
               <ProtectedRoute>
                 <GovernmentDashboard />
               </ProtectedRoute>
             }
           />
         </Routes>
       </div>
     );
}


export default App