import { Navigate, Outlet} from "react-router"
import { useAuthStore } from "../../store/authStore"
export default function Protected() {


  const token = useAuthStore(s => s.token)
  if (!token || token.trim() === "") {

    return <Navigate to='/login' replace />
  }



  return (

    <Outlet />

  )
}
