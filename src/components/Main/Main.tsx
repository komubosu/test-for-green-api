import { FC, useEffect, useRef, useState } from 'react';

import { User } from '../../types/user.type';
import { Message } from '../../types/message.type';
import greenApi from '../../api/GreenApi';

import { Chat, Contacts } from '..';

import './Main.scss';

interface MainProps {
  user: User;
  contacts: string[];
  addContact: (arg: string) => void;
}

const Main: FC<MainProps> = ({ user, contacts, addContact }) => {
  const [selectedContact, setSelectedContact] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const intervalIDRef = useRef<number>(0);

  useEffect(() => {
    if (selectedContact) {
      handleMessages();
      intervalIDRef.current = setInterval(handleNotification, 5000);
    }
  }, [selectedContact]);

  useEffect(() => {
    return () => {
      clearInterval(intervalIDRef.current);
    };
  }, []);

  const handleContactClick = (contact: string) => {
    setSelectedContact(contact);
  };

  const handleNotification = async () => {
    await greenApi
      .getNotification(user)
      .then(async res => {
        console.log(res);
        if (res) {
          if (
            (res.body.typeWebhook === 'outgoingMessageStatus' &&
              res.body.status === 'delivered') ||
            (res.body.typeWebhook === 'incomingMessageReceived' &&
              res.body.senderData.chatId.slice(0, -5) === selectedContact)
          ) {
            await handleMessages();
          }

          await greenApi
            .deleteNotification(user, res.receiptId)
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  const handleMessages = async () => {
    await greenApi
      .getMessages(user, selectedContact)
      .then(res => setMessages(res.reverse()))
      .then(() => {
        const chatElement = document.querySelector('.chat__messages');

        if (chatElement) {
          setTimeout(
            () =>
              chatElement.scrollTo({
                top: chatElement.scrollHeight,
                behavior: 'smooth',
              }),
            1000
          );
        }
      })
      .catch(err => console.log(err));
  };

  const handleSendMessage = async (message: string) => {
    await greenApi
      .sendMessage(user, selectedContact, message)
      .catch(err => console.log(err));
  };

  return (
    <main className='main'>
      <Contacts
        selectedContact={selectedContact}
        contacts={contacts}
        handleContactClick={handleContactClick}
        addContact={addContact}
      />
      {selectedContact && (
        <Chat
          selectedContact={selectedContact}
          messages={messages}
          onSubmit={handleSendMessage}
        />
      )}
    </main>
  );
};

export default Main;
