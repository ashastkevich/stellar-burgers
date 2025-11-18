import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getLoginUserErrorSelector, register } from '../../services/slices/usersSlice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLoginError = useSelector(getLoginUserErrorSelector);

  

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({name: userName, email: email, password: password}));
  };

  return (
    <RegisterUI
      errorText={userLoginError || undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
