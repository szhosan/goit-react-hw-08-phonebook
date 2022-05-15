import { useState } from 'react';
import s from './AddContactForm.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

function AddContactForm() {
  const [contact, setContact] = useState({ name: '', number: '' });

  const dispatch = useDispatch();
  const addedContacts = useSelector(contactsSelectors.getAddedContacts);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setContact(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const nameAlreadyExist = (contacts, nameToAdd) => {
    return contacts.find(
      contact => contact.name.toLowerCase() === nameToAdd.toLowerCase()
    );
  };

  const reset = () => {
    setContact({ name: '', number: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!nameAlreadyExist(addedContacts, contact.name)) {
      dispatch(contactsOperations.addContact(contact));
    } else {
      alert(`Name ${contact.name} already exists in your phone book`);
    }

    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.form_label}>
        Name
        <br />
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer"
          required
          value={contact.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Number
        <br />
        <input
          type="tel"
          name="number"
          required
          value={contact.number}
          onChange={handleChange}
        />
      </label>
      <br />
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default AddContactForm;
