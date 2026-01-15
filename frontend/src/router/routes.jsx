import { Navigate, useNavigate, useRoutes } from 'react-router-dom'
import Register from '../pages/RegistrationPage'
import Login from '../pages/LoginPage'
import Todos from '../pages/TodosPage'
import RequireAuth from '../hoc/RequireAuth'
import NotFound from '../pages/NotFound.jsx'
import { useDispatch, useSelector } from 'react-redux'


const AppRoutes = () => {
  const { isAuth } = useSelector(state => state.auth);
  const routes = useRoutes([
    { path: '*', element: <NotFound /> },
    { path: '/registration', element: isAuth ? <Navigate to='/' replace /> : <Register /> },
    { path: '/login', element: isAuth ? <Navigate to='/' replace /> : <Login /> },
    { path: '/', element: <RequireAuth><Todos /></RequireAuth> },
  ])

  return routes
}

export default AppRoutes