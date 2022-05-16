import { useState } from 'react';
import s from './AddContactForm.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactPhoneInput from 'react-phone-input-material-ui';
import { useConfirm } from 'material-ui-confirm';

const theme = createTheme();

function AddContactForm() {
  const [contact, setContact] = useState({ name: '', number: '' });
  const dispatch = useDispatch();
  const addedContacts = useSelector(contactsSelectors.getAddedContacts);
  const confirmDialog = useConfirm();

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setContact(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const onNumberChange = value => {
    setContact(prevState => {
      return { ...prevState, ['number']: value };
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
    if (contact.name.length === 0 || contact.number.length === 0) {
      confirmDialog({
        title: `Fields "Name" or "Number" can't be empty!`,
        description: `Type "Name" and "Number" to relevant fields!`,
        cancellationText: '',
      }).catch(() => {});
      return;
    }
    if (!nameAlreadyExist(addedContacts, contact.name)) {
      dispatch(contactsOperations.addContact(contact));
    } else {
      alert(`Name ${contact.name} already exists in your phone book`);
    }

    reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add new contact
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="Name"
              autoFocus
              value={contact.name}
              onChange={handleChange}
            />
            <ReactPhoneInput
              required
              value={contact.number}
              onChange={onNumberChange} // passed function receives the phone value
              component={TextField}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddContactForm;

{
  /* <form className={s.form} onSubmit={handleSubmit}>
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
    </form> */
}
