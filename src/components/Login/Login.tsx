import { ChangeEvent, FC, FormEvent, useState } from 'react';

import { User } from '../../types/user.type';

import './Login.scss';

interface LoginProps {
  onSubmit: (arg: User) => void;
  requestError: string;
}

const Login: FC<LoginProps> = ({ onSubmit, requestError }) => {
  const [values, setValues] = useState<User>({
    id: '',
    apiToken: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(values);
  };

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h1 className='login__title'>
        Введите данные{' '}
        <a href='https://green-api.com/' target='_blank'>
          Green Api
        </a>
      </h1>
      <label className='login__label'>
        IdInstance
        <input
          className='login__input'
          placeholder='IdInstance'
          type='text'
          name='id'
          onChange={handleChange}
        />
      </label>
      <label className='login__label'>
        ApiTokenInstance
        <input
          className='login__input'
          placeholder='ApiTokenInstance'
          type='text'
          name='apiToken'
          onChange={handleChange}
        />
      </label>
      <button className='login__button'>Сохранить</button>
      <p className='login__error'>{requestError}</p>
    </form>
  );
};

export default Login;
