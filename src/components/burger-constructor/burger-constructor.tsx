import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { getConstructorSelector, clearConstructor } from '../../services/slices/constructorSlice';
import { useDispatch } from '../../services/store';
import { getBurger, getOrdersSelector, clearOrderData } from '../../services/slices/ordersSlice';
import { getUserSelector } from '../../services/slices/usersSlice';
import { useNavigate, useLocation } from 'react-router-dom';


export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const ingredientsIds = [constructorItems.bun?._id, ...constructorItems.ingredients.map(i => i._id)].filter(Boolean) as string[];

  const orderState = useSelector(getOrdersSelector);
  const orderRequest = orderState.orderRequest;
  const orderModalData = orderState.orderData;

  const userState = useSelector(getUserSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userState.data) {
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch(getBurger(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrderData());
  };

  useEffect(() => {
    if (orderModalData) {
      dispatch(clearConstructor());
    }
  }, [orderModalData, dispatch]);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
