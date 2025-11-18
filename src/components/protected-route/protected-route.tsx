import { useSelector} from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import { getUserAuthCheckedSelector, getUserDataSelector } from '../../services/slices/usersSlice';
import { Preloader } from '@ui';


type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const userData = useSelector(getUserDataSelector);
  const userAuthChecked = useSelector(getUserAuthCheckedSelector);

  const location = useLocation();


  if (!userAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !userData) {
    return <Navigate replace to='/login' state={{ from: location }} />; 
  }

  if (onlyUnAuth && userData) { 
        const from  = location.state?.from || { pathname: '/' };
        return <Navigate replace to={from} />;
  }

    return children ;
}