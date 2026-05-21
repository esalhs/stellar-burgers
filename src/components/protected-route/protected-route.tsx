import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ onlyUnAuth = false }) => {
  const { user, isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    return <Navigate to='/' />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
