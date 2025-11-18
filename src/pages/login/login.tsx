import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login, getUserAuthSelector, getLoginUserErrorSelector } from '../../services/slices/usersSlice';
import { Navigate } from 'react-router';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getUserAuthSelector);
  const loginUserError = useSelector(getLoginUserErrorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({email: email, password: password}));
  };

  if (isAuthenticated) {
    return (
      <Navigate
        to={'/'}
      />
    )
  }

  return (
    <LoginUI
      errorText={loginUserError || undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
