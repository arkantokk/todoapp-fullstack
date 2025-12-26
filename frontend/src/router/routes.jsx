import { useRoutes } from 'react-router-dom'
import Register from '../pages/RegistrationPage'
import Login from '../pages/LoginPage'
import Todos from '../pages/TodosPage'
const AppRoutes = () => useRoutes([
  { path: '/registration', element: <Register /> },
  {path: '/login', element: <Login />},
  {path: '/', element: <Todos />}
])

export default AppRoutes