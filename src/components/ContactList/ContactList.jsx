import { default as PropTypes } from 'prop-types';
import { ContactListStyled, ContactItem } from './ContactList.styled';
import { Button } from '../App/App.styled';

export function ContactList(props) {
  const { contacts, handleDelete } = props;
  return (
    <ContactListStyled>
      {contacts.map(el => {
        return (
          <ContactItem key={el.id} id={el.id}>
            <span>{el.name}</span>: <span>{el.number}</span>
            <Button onClick={handleDelete} size={200}>delete</Button>
          </ContactItem>
        );
      })}
    </ContactListStyled>
  );
}

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  handleDelete: PropTypes.func
};
