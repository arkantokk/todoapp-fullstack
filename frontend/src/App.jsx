import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router/routes'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isLoading, isAuth } = useSelector(state => state.auth);
  const [isChecking, setIsChecking] = useState(true);
  const shouldRun = useRef(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (shouldRun.current && token) {
      shouldRun.current = false;
      // Ми НЕ чекаємо закінчення checkAuth, щоб показати додаток, 
      // якщо у нас вже є дані в localStorage
      dispatch(checkAuth()).finally(() => {
        setIsChecking(false);
      });
    } else {
      setIsChecking(false);
    }
  }, [dispatch]);

  // ЗМІНА: Якщо в Redux вже є дані (isAuth: true з initialState), 
  // ми показуємо контент навіть поки йде перевірка (isLoading)
  if (isChecking && !isAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        Loading...
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App