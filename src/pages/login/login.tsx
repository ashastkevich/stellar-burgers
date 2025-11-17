import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login, getUserSelector } from '../../services/slices/usersSlice';
import { Navigate } from 'react-router';

export const Login: FC = () => {
  const userState = useSelector(getUserSelector);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = userState.isAuthenticated;

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
      errorText={userState.loginUserError || undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
