import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Phonebook } from './app.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onFormSubmit = evt => {
    evt.preventDefault();

    const { name, number } = evt.target.elements;

    this.setState(prevState => {
      const contact = {
        id: nanoid(),
        name: name.value,
        number: number.value,
      };

      const filteredContact = prevState.contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      );

      evt.target.reset();

      return filteredContact
        ? alert(`${contact.name} is already in contacts`)
        : {
            contacts: [contact, ...prevState.contacts],
          };
    });
  };

  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  removeContact = id => {
    const filtered = this.state.contacts.filter(contact => contact.id !== id);

    this.setState({
      contacts: filtered,
    });
  };

  render() {
    const normalizeText = this.state.filter.toLowerCase();

    const filteredContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeText)
    );

    return (
      <Phonebook>
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.onFormSubmit} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChangeFilter={this.changeFilter} />
        <ContactList
          contacts={filteredContact}
          onRemoveContact={this.removeContact}
        />
      </Phonebook>
    );
  }
}

export default App;
