import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedOrdersSelector, getFeeds, getFeedsSelector } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const feedInfo = useSelector(getFeedsSelector);
  const dispatch = useDispatch();
  const feedOrders = useSelector(getFeedOrdersSelector);

  useEffect(() => {
    if (!feedOrders.length) {
      dispatch(getFeeds());
    }
  }, [dispatch, feedInfo.orders.length]);

  const orders: TOrder[] = feedOrders;

  if (feedInfo.loading) return <Preloader />;

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />;
};
