import { FC, FormEvent, useState } from 'react';

import { Message } from '../../types/message.type';

import './Chat.scss';

interface ChatProps {
  selectedContact: string;
  messages: Message[];
  onSubmit: (arg: string) => void;
}

const Chat: FC<ChatProps> = ({ selectedContact, messages, onSubmit }) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <p className='chat__contact'>{selectedContact}</p>
      </div>
      <ul className='chat__messages'>
        {messages.map(message =>
          message.textMessage ? (
            <li
              key={message.idMessage}
              className={`chat__message chat__message_type_${message.type}`}
            >
              {message.textMessage}
            </li>
          ) : null
        )}
      </ul>
      <form className='chat__form' onSubmit={handleSubmit}>
        <input
          className='chat__input'
          type='text'
          placeholder='Напишите сообщение...'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Chat;
