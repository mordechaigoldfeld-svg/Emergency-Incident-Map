import { Outlet } from "react-router"

export default function Protected() {
  return (
    <div>Protected
        <div><Outlet/></div>
    </div>
    
  )
}
