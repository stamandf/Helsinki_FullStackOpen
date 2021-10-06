import React from 'react';

const Person = ({ person, deletePerson }) => {
    return (
        <p>
            <li key={person.id}>
                {person.name} : {person.number}&nbsp;&nbsp;
                <button onClick={deletePerson}>Delete</button>
            </li>
        </p>
    )
}
export default Person;