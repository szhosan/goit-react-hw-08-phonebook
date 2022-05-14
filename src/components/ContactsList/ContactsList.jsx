import React from 'react';
import s from './ContactsList.module.css';
import contactActions from '../../redux/contacts/contact-actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const ContactsList = () => {
  const filter = useSelector(state => state.contacts.filter).toLowerCase();
  const contacts = useSelector(state =>
    state.contacts.items.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    )
  );
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
                onClick={() => dispatch(contactActions.deleteContact(id))}
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
