import { FC, useEffect, useState } from 'react';

import greenApi from '../../api/GreenApi';
import useRequestError from '../../hooks/useRequestError';
import { User } from '../../types/user.type';

import { Login, Main } from '..';

import './App.scss';

const App: FC = () => {
  const [isLogged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ id: '', apiToken: '' });
  const [contacts, setContacts] = useState<string[]>([]);
  const [requestError, setRequestError] = useState<string>('');
  const reqError = useRequestError();

  useEffect(() => {
    const storageUser = localStorage.getItem('user');

    if (typeof storageUser === 'string') {
      handleLogin(JSON.parse(storageUser));
    }
  }, []);

  const handleLocalStorage = (user: User, type: 'set' | 'remove') => {
    switch (type) {
      case 'set':
        localStorage.setItem('user', JSON.stringify(user));
        break;

      case 'remove':
        localStorage.removeItem('user');
        break;
    }

    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogin = async (user: User) => {
    setRequestError('');

    await greenApi
      .getStatus(user)
      .then(res => {
        if (res.statusInstance === 'online') {
          handleLocalStorage(user, 'set');
          setUser(user);
          setLogged(true);
        } else
          setRequestError(
            'Аккаунт не авторизован. Для авторизации аккаунта перейдите в Личный кабинет и считайте QR-код из приложения WhatsApp Business на телефоне.'
          );
      })
      .catch(err => {
        setRequestError(reqError(err.status));
        handleLocalStorage(user, 'remove');
      });
  };

  const addContact = (contact: string) => {
    setContacts(contacts =>
      contacts.includes(contact) ? contacts : [...contacts, contact]
    );
  };

  return (
    <div className='app'>
      {isLogged ? (
        <Main user={user} contacts={contacts} addContact={addContact} />
      ) : (
        <Login onSubmit={handleLogin} requestError={requestError} />
      )}
    </div>
  );
};

export default App;
