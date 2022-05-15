import React from 'react';
import s from './ContactsList.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

const ContactsList = () => {
  const contacts = useSelector(contactsSelectors.getFilteredContacts);
  const dispatch = useDispatch();
  return (
    <>
      <ul className={s.list}>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            <div className={s.listItemContainer}>
              {name}: {number}
              <button
                className={s.button}
                onClick={() => dispatch(contactsOperations.deleteContact(id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactsList;
