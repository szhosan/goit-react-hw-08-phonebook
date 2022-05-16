import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import ContactSearch from 'components/ContactSearch/ContactSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useConfirm } from 'material-ui-confirm';

const ContactsList = () => {
  const contacts = useSelector(contactsSelectors.getFilteredContacts);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const confirmDialog = useConfirm();

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleDelete = () => {
    const namesToDelete = checked
      .map(idToDelete => contacts.find(({ id }) => id === idToDelete).name)
      .join(', ');
    confirmDialog({
      description: `Are you really want to delete ${namesToDelete} from your book?`,
    })
      .then(() => {
        checked.map(id => dispatch(contactsOperations.deleteContact(id)));
        setChecked([]);
      })
      .catch(() => {});
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <IconButton aria-label="add" size="large">
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
        <ContactSearch />
        <IconButton
          aria-label="delete"
          size="large"
          disabled={checked.length < 1}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <List
        dense
        sx={{ width: '100%', maxWidth: 385, bgcolor: 'background.paper' }}
      >
        {contacts.map(({ id, name }) => {
          const labelId = `checkbox-list-secondary-label-${id}`;
          return (
            <ListItem
              key={id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(id)}
                  checked={checked.indexOf(id) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={`${name}`} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default ContactsList;
/* <ul className={s.list}>
        {contacts.map(({ id, name, number }) => (
          <li key={id}>
            <div className={s.listItemContainer}>
              {name}: {number}
              <button
                className={s.button}
                onClick={() => dispatch(contactsOperations.deleteContact(id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul> */
