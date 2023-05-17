import { FC } from 'react';

import { ContactSearchBar } from '..';

import './Contacts.scss';

interface ContactsProps {
  selectedContact: string;
  contacts: string[];
  handleContactClick: (arg: string) => void;
  addContact: (arg: string) => void;
}

const Contacts: FC<ContactsProps> = ({
  selectedContact,
  contacts,
  handleContactClick,
  addContact,
}) => {
  return (
    <div className='contacts'>
      <ContactSearchBar addContact={addContact} />
      <ul className='contacts__chats'>
        {contacts.map(contact => (
          <li
            className={`contacts__chat ${
              contact === selectedContact ? 'contacts__chat_type_active' : ''
            }`}
            key={contact}
            onClick={() => handleContactClick(contact)}
          >
            {contact}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
