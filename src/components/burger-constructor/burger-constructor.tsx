import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { burgerApi, clearOrder } from '../../services/constructorSlice';
import {
  selectConstructorBun,
  selectConstructorIngredients,
  selectOrderModalData,
  selectOrderRequest,
  selectUserData
} from '@selectors';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const constructorItems = { bun, ingredients };

  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userData.user) {
      navigate('/login');
    } else {
      dispatch(
        burgerApi([
          bun?._id as string,
          ...ingredients.map((ing) => ing._id),
          bun?._id as string
        ])
      );
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

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
