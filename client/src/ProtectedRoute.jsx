import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

function ProtectedRoute(){
    const {user, isAdmin,loading} = useAuth()


    if (loading) return <h1>cargando</h1>
    if(!loading && !isAdmin) return <Navigate to='/login' replace/>

    return <Outlet/>
}

export default ProtectedRoute