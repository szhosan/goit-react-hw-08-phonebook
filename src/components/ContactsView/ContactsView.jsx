import ContactsList from 'components/ContactsList/ContactsList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { contactsOperations } from 'redux/contacts';
import { ConfirmProvider } from 'material-ui-confirm';

export default function ContactsView() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);
  return (
    <>
      <ConfirmProvider>
        <ContactsList />
      </ConfirmProvider>
    </>
  );
}
