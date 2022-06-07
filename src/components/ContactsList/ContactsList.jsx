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
import Modal from '@mui/material/Modal';
import AddEditContactForm from 'components/AddEditContactForm/AddEditContactForm';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ContactsList = () => {
  const contacts = useSelector(contactsSelectors.getFilteredContacts);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const confirmDialog = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactIdToEdit, setContactIdToEdit] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContactIdToEdit('');
  };

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
      description: `Are you really want to delete ${namesToDelete} from your contact book?`,
    })
      .then(() => {
        checked.map(id => dispatch(contactsOperations.deleteContact(id)));
        setChecked([]);
      })
      .catch(() => {});
  };

  const handleEditContactClick = id => {
    setContactIdToEdit(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <Container maxWidth="xs" sx={{ mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <IconButton aria-label="add" size="large" onClick={handleOpenModal}>
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
          {contacts.map(({ id, name, number }) => {
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
                <ListItemButton onClick={() => handleEditContactClick(id)}>
                  <ListItemAvatar>
                    <Avatar alt={`${name}`} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`${name}`} />
                  <ListItemText
                    sx={{ textAlign: 'right' }}
                    primary={`${number}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Container>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddEditContactForm
              onClose={handleCloseModal}
              contactIdToEdit={contactIdToEdit ? contactIdToEdit : null}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ContactsList;
