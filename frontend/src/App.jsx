import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './router/routes'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, setLoading } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);
  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      const token = localStorage.getItem('token');
      
      if (token) {
        dispatch(checkAuth());
      } else {
        dispatch(setLoading(false));
      }
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App;