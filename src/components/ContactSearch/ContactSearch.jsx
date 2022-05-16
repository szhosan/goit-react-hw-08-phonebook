import React from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { contactsSelectors, changeFilter } from 'redux/contacts';
import TextField from '@mui/material/TextField';

const ContactSearch = () => {
  const value = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  return (
    <TextField
      id="contacts-search"
      label="Search"
      value={value}
      onChange={onChange}
      type="search"
    />
  );
};

export default ContactSearch;
