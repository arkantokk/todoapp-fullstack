import { useRoutes } from 'react-router-dom'
import Register from '../pages/Register'

const AppRoutes = () => useRoutes([
  { path: '/', element: <Register /> }
])

export default AppRoutes