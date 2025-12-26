import { useRoutes, BrowserRouter } from 'react-router-dom'

import './App.css'
import AppRoutes from './router/routes'


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    )

}

export default App
