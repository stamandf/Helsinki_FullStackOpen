import React, { useEffect, useState } from 'react';
import phoneBookService from './service/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm'
import Person from './components/Person';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('');
  const [message, setMessage] = useState('')
  const [isError, setError] = useState(null)

  useEffect(() => {
    phoneBookService
    .getPhoneBook()
    .then(initialPersons => {
      console.log('initialPersons = ', initialPersons);
      setPersons(initialPersons)
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const found = persons.findIndex((person) => person.name === newName);
    if (found > 0) {
      let changedPerson = persons[found];
      const changeConfirmed = window.confirm(`${newName} is already added to phonebook. Replace the old number with new one?`);
      if (changeConfirmed) {
        changedPerson = { ...changedPerson, number: newPhone };
        phoneBookService
        .update(changedPerson.id,changedPerson)
        .then((changedPerson) => {
          setPersons(persons.map(person => person.name !== newName ? person: changedPerson ));
          setMessage(`Modified ${changedPerson.name}.`);
          setError(false);
          setNewName('');
          setNewPhone('');
        })
        .catch(error => {
          setMessage(`The person '${changedPerson.name}' was already removed from server.`)
          setError(true);
        });
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      }
    } else {
      const personObject = { name: newName, number: newPhone };
      phoneBookService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
        setMessage(`Added ${createdPerson.name}.`);
        setError(false);
        setNewName('');
        setNewPhone('');
      })
      .catch(error => {
        setMessage(`Some error happened...`)
        setError(true);
      });
      setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 5000);
      
    }
  }
  
  const deletePerson = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}?`);
    if (confirmed) {
      phoneBookService
        .deletePerson(id)
        .then (deletedPerson => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage(`Deleted ${name}.`);
          setError(false);
        })
        .catch(error => {
          setMessage(`The person '${name}' was already removed from server.`);
          setError(true);
        });
        setTimeout(() => {
          setMessage(null)
          setError(null);
        }, 5000);
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const personsToShow = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div>
        <h2>Phonebook</h2>
        {
          message ? <Notification message={message} isError={isError} /> : <p></p>
        }
        
      <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      </div>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <div>
                {
                persons.map((person) => 
                  <Person 
                    key={person.id}
                    person={person} 
                    deletePerson={() => deletePerson(person.id, person.name)}
                  />)
                }
            </div>
            <h2>With Filter</h2>
            { 
              personsToShow.map((person) => 
                <Person
                  key={person.id} 
                  person={person} 
                />) 
            }
    </div>
  );
}

export default App;
