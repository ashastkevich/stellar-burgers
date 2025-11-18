import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getProfileOrdersSelector, getProfileOrders } from '../../services/slices/profileOrdersSlice';
import { getFeedsSelector, getFeeds } from '../../services/slices/feedSlice';
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  const profileOrders = useSelector(getProfileOrdersSelector);
  const feedState = useSelector(getFeedsSelector);
  const ingredientsState = useSelector(getIngredientsSelector);

  useEffect(() => {
    if (!profileOrders.length) {
      dispatch(getProfileOrders());
    }
    if (!feedState.orders.length) {
      dispatch(getFeeds());
    }
  }, [dispatch]);

  const orderData: TOrder | null =
    profileOrders.find((o) => String(o.number) === String(number)) ||
    feedState.orders.find((o) => String(o.number) === String(number)) ||
    null;

  const ingredients: TIngredient[] = ingredientsState;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
