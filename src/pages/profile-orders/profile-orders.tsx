import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getProfileOrdersSelector, getProfileOrders } from '../../services/slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const profileOrders = useSelector(getProfileOrdersSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);

  const orders: TOrder[] = profileOrders.orders;

  return <ProfileOrdersUI orders={orders} />;
};
