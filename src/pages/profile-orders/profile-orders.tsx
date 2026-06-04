import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { ordersApi } from '../../services/userOrderSlice';
import { selectUserOrders } from '@selectors';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersApi());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
