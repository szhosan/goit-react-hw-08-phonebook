import React from 'react';
import contactActions from '../../redux/contacts/contact-actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { contactsSelectors, changeFilter } from 'redux/contacts';

const ContactSearch = () => {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();
  const onChange = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };
  return (
    <label>
      Find contacts by name
      <br />
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};

export default ContactSearch;
