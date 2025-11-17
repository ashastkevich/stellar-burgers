import { useSelector} from '../../services/store';
import { Navigate, useLocation } from 'react-router';
import { getUserSelector } from '../../services/slices/usersSlice';
import { Preloader } from '@ui';


type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const userState = useSelector(getUserSelector);
  const location = useLocation();


  if (!userState.isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !userState.data) {
    return <Navigate replace to='/login' state={{ from: location }} />; 
  }

  if (onlyUnAuth && userState.data) { 
        const from  = location.state?.from || { pathname: '/' };
        return <Navigate replace to={from} />;
  }

    return children ;
}