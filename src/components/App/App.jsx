import { useEffect, useState } from 'react';
import { Container } from './App.styled';
import { ContactForm } from '../ContactForm';
import { ContactList } from '../ContactList';
import { Filter } from '../Filter';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState(
    !localStorage.getItem('contacts')
      ? ''
      : JSON.parse(localStorage.getItem('contacts'))
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const emptyMsg = 'Contact list is empty';
  const emptyFilterMsg = 'Nothing is found';

  const toastAlert = msg => {
    toast.error(msg);
  };

  const handleChange = evt => {
    setFilter(evt.target.value);
  };

  const addContact = ({ name, number }) => {
    const found = contacts.find(
      el => el.name.trim().toUpperCase() === name.trim().toUpperCase()
    );
    if (found) {
      toastAlert(`${name} already exists`);
      return false;
    }
    setContacts([
      ...contacts,
      {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      },
    ]);
    return true;
  };

  const handleDelete = evt => {
    const contactId = evt.currentTarget.parentNode.id;
    const newContacts = contacts.filter(el => el.id !== contactId);
    setContacts(newContacts);
    setFilter(newContacts.length > 0 ? filter : '');
  };

  const getContacts = () => {
    if (filter) {
      return contacts.filter(el =>
        el.name.toUpperCase().includes(filter.trim().toUpperCase())
      );
    }
    return contacts;
  };

  return (
    <Container>
      <Toaster position="top-right" />
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>

      {contacts.length > 0 ? (
        <>
          <Filter filter={filter} handleFilter={handleChange} />
        </>
      ) : (
        <p>{emptyMsg}</p>
      )}
      {getContacts().length > 0 ? (
        <ContactList contacts={getContacts()} handleDelete={handleDelete} />
      ) : (
        <p>{emptyFilterMsg}</p>
      )}
    </Container>
  );
}
