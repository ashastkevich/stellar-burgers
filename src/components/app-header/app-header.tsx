import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../services/slices/usersSlice';


export const AppHeader: FC = () => <AppHeaderUI userName={useSelector(getUserSelector).data?.name} />;
