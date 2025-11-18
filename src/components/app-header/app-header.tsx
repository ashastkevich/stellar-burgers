import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserDataSelector } from '../../services/slices/usersSlice';


export const AppHeader: FC = () => <AppHeaderUI userName={useSelector(getUserDataSelector)?.name} />;
