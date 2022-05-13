import React from 'react';
import s from './ContactListItem.module.css';
import { useDeleteContactMutation } from 'redux/contacts/contactsSlice';
import { BeatLoader } from 'react-spinners';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

const ContactListItem = ({ contact }) => {
  const [deleteContact, isLoading] = useDeleteContactMutation();
  const { id, name, number } = contact;

  return (
    <div className={s.listItemContainer}>
      <div className={s.nameContainer}>{name}</div>
      <div className={s.numberContainer}>{number}</div>
      <button
        className={s.button}
        onClick={() => {
          deleteContact(id).then(() => {
            Notify.success(`Contact with name: ${name} successfully deleted`);
          });
        }}
      >
        {isLoading.isLoading ? <BeatLoader css="height: 10px" /> : 'Delete'}
      </button>
    </div>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};

export default ContactListItem;
