import { createSelector } from '@reduxjs/toolkit';

const getLoading = state => state.contacts.loading;

const getFilter = state => state.contacts.filter;

const getAllContacts = state => state.contacts.items;

const getFilteredContacts = createSelector(
  [getAllContacts, getFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);

const getAddedContacts = createSelector([getAllContacts], contacts => contacts);

const contactsSelectors = {
  getLoading,
  getFilter,
  getAllContacts,
  getFilteredContacts,
  getAddedContacts,
};

export default contactsSelectors;
