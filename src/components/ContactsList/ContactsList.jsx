import React from 'react';
import s from './ContactsList.module.css';
import ContactListItem from 'components/ContactListItem/ContactListItem';

import PropTypes from 'prop-types';

const ContactsList = ({ contacts }) => {
  return (
    <>
      {contacts && (
        <ul className={s.list}>
          {contacts.map(contact => (
            <li key={contact.id}>
              <ContactListItem contact={contact} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactsList;
