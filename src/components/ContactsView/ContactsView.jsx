import Section from 'components/Section/Section';
import AddContactForm from 'components/AddContactForm/AddContactForm';
import ContactSearch from 'components/ContactSearch/ContactSearch';
import ContactsList from 'components/ContactsList/ContactsList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { contactsOperations } from 'redux/contacts';

export default function ContactsView() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);
  return (
    <Section>
      <AddContactForm />
      <ContactSearch />
      <ContactsList />
    </Section>
  );
}
