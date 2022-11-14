import { useEffect, useState } from 'react';
import { useEffectOnce } from '../../helpers/useEffectOnce';
import { Container } from './App.styled';
import { ContactForm } from '../ContactForm';
import { ContactList } from '../ContactList';
import { Filter } from '../Filter';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ])
  const [filter, setFilter] = useState("");

  useEffectOnce(() => {
    const localStrContacts = localStorage.getItem('contacts');
    if (!localStrContacts) {
      return;
    }
    try {
      const localContacts = JSON.parse(localStrContacts);
      if (!(localContacts instanceof Array)) {
        this.toastAlert(
          'Error of reading localStorage contacts: array expected'
        );
        return;
      }
      setContacts([...localContacts]);
    } catch (exc) {
      this.toastAlert(
        'Error of reading localStorage contacts: JSON data is invalid'
      );
    }
  });

  useEffect(()=> {
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
    const found = contacts.findIndex(
      el => el.name.trim().toUpperCase() === name.trim().toUpperCase()
    );
    if (found >= 0) {
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
      <ContactForm
        addContact={addContact}
      />

      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter
            filter={filter}
            handleFilter={handleChange}
          />
          {getContacts().length > 0 ? (
            <ContactList
              contacts={getContacts()}
              handleDelete={handleDelete}
            />
          ) : (
            <p>{emptyFilterMsg}</p>
          )}
        </>
      ) : (
        <p>{emptyMsg}</p>
      )}
    </Container>
  );
}
