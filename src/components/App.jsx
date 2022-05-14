import Section from './Section/Section';
import AddContactForm from './AddContactForm/AddContactForm';
import ContactsList from './ContactsList/ContactsList';
import ContactSearch from './ContactSearch/ContactSearch';
import { useSelector } from 'react-redux';

function App() {
  const contactAmount = useSelector(state => state.contacts.items.length);
  return (
    <>
      <Section title="Phone Book">
        <AddContactForm />
      </Section>
      {contactAmount > 0 && (
        <Section title="Contacts">
          <ContactSearch />
          <ContactsList />
        </Section>
      )}
    </>
  );
}

export default App;
