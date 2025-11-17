import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { checkUserAuth } from '../../services/slices/usersSlice';
import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const background = state?.background;
  const dispatch = useDispatch<AppDispatch>();
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
        <AppHeader />
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/login' element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
            <Route path='/register' element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='*' element={<NotFound404 />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/profile/orders' element={<ProfileOrders />} />
            <Route path='/profile/orders/:number' element={<OrderInfo />} />
            <Route path='/feed/:number' element={<OrderInfo />} />

          </Routes>
          {background && <Routes>
            <Route path='/ingredients/:id' element={<Modal title='Детали ингридиента' onClose={() => navigate(-1)}><IngredientDetails /></Modal>} />
            <Route path='/profile/orders/:number' element={<Modal title={`#${String(orderNumber).padStart(6, '0')}`} onClose={() => navigate(-1)}><OrderInfo /></Modal>} />
            <Route path='/feed/:number' element={<Modal title={`#${String(orderNumber).padStart(6, '0')}`} onClose={() => navigate(-1)}><OrderInfo /></Modal>} />
          </Routes>
          }
    </div>
  );
};

export default App;
