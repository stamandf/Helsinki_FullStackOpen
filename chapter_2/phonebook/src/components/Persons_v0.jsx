import React from 'react';

const Persons = ({ persons, personsToShow }) => {
    return (
        <div>
            <div>
                {
                persons.map((person) => <p key={person.name}>{person.name} : {person.number}</p>)
                }
            </div>
            <h2>With Filter</h2>
            { personsToShow.map((person) => <p key={person.name}>{person.name}</p>) }
        </div>
    )
}
export default Persons;