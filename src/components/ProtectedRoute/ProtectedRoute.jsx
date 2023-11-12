import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = ({ isAllowed, redirectTo='/auth' }) => {
  const { token } = useSelector(state => state.auth)
  const location = useLocation();

  if(!isAllowed) return <Navigate to={redirectTo} />

  return (
    token ? <Outlet /> : <Navigate to={redirectTo} state={{ from: location }} />
  ) 
}
