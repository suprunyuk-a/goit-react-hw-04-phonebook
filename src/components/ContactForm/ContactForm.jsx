import { useState } from 'react';
import { default as PropTypes } from 'prop-types';
import { ContactFormStyled } from './ContactForm.styled';
import { nanoid } from 'nanoid';
import {
  Button,
  InputGroup,
  InputLabel,
  Input,
  InputBar,
} from '../App/App.styled';

export function ContactForm(props) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = evt => {
    if(evt.target.name === "name"){
      setName(evt.target.value);
    }
    if(evt.target.name === "number"){
      setNumber(evt.target.value);
    }
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const { addContact } = props;
    if (addContact({
      name: name,
      number: number
    })) {
      setName('');
      setNumber('');
      evt.target.reset();
    }
  };

  const inputNameId = nanoid();
  const inputNumberId = nanoid();

  return (
    <ContactFormStyled onSubmit={handleFormSubmit} autoComplete="off">
      <InputGroup>
        <Input
          type="text"
          id={inputNameId}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          onChange={handleChange}
          required
        />
        <InputLabel htmlFor={inputNameId}>Name</InputLabel>
        <InputBar></InputBar>
      </InputGroup>
      <InputGroup>
        <Input
          type="tel"
          name="number"
          id={inputNumberId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={number}
          onChange={handleChange}
          required
        />
        <InputLabel htmlFor={inputNumberId}>Number</InputLabel>
        <InputBar></InputBar>
      </InputGroup>
      <div>
        <Button type="submit">Add contact</Button>
      </div>
    </ContactFormStyled>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
