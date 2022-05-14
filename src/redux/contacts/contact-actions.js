import { nanoid } from 'nanoid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contacts/Add', data => ({
  payload: { id: nanoid(), ...data },
}));

const deleteContact = createAction('contacts/Delete');

const changeFilter = createAction('contacts/ChangeFilter');

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { addContact, changeFilter, deleteContact };
