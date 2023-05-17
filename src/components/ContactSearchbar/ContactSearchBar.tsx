import { FC, FormEvent, useState } from 'react';

import './ContactSearchBar.scss';

interface ContactSearchBarProps {
  addContact: (arg: string) => void;
}

const ContactSearchBar: FC<ContactSearchBarProps> = ({ addContact }) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addContact(value.trim());
    setValue('');
  };

  return (
    <form className='contact-search-bar' onSubmit={handleSubmit}>
      <input
        className='contact-search-bar__input'
        type='text'
        placeholder='Введите номер начиная с 7 без +'
        value={value}
        name='number'
        onChange={e => setValue(e.target.value)}
      />
      <button
        className='contact-search-bar__button'
        disabled={value.trim() ? false : true}
      >
        Добавить чат
      </button>
    </form>
  );
};

export default ContactSearchBar;
