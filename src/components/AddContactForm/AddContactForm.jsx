import { useState } from 'react';
import s from './AddContactForm.module.css';
import { useCreateContactMutation } from 'redux/contacts/contactsSlice';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

function AddContactForm({ contacts }) {
  const [contact, setContact] = useState({ name: '', number: '' });
  const [createContact, { isLoading }] = useCreateContactMutation();

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

  const HandleSubmit = e => {
    e.preventDefault();
    if (nameAlreadyExist(contacts, contact.name)) {
      Notify.warning(`Name ${contact.name} is present in your phone book`);
      return;
    }
    createContact(contact).then(
      Notify.success(
        `Name ${contact.name} successfully added to your phone book`
      )
    );

    reset();
  };

  return (
    <form className={s.form} onSubmit={HandleSubmit}>
      <div>
        <label className={s.form_label}>
          Name
          <br />
          <input
            className={s.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer"
            required
            value={contact.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label className={s.form_label}>
          Number
          <br />
          <input
            className={s.input}
            type="tel"
            name="number"
            required
            value={contact.number}
            onChange={handleChange}
          />
        </label>
      </div>
      <button disabled={isLoading} className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

AddContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default AddContactForm;
