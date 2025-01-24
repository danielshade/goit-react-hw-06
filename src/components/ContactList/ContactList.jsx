import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, editContact } from '../../redux/contactsSlice';
import { selectVisibleContacts } from '../../redux/selectors';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

function ContactList() {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);

  return (
    <ul className={css.list}>
      {visibleContacts.map(contact => (
        <li className={css.item} key={contact.id}>
          <Contact
            {...contact}
            onDelete={() => dispatch(deleteContact(contact.id))}
            onEdit={updatedContact => dispatch(editContact(updatedContact))}
          />
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
