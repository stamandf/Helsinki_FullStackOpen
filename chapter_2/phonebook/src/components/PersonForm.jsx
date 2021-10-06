import React from 'react';

const PersonForm = ({ addPerson, newName, handleNameChange, newPhone, handlePhoneChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
            Name: <input 
                value={newName}
                onChange={handleNameChange}
            />
            
            </div>
            <div>
            Phone: <input 
                value={newPhone}
                onChange={handlePhoneChange}
            />
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
      </form>
    )
}
export default PersonForm;