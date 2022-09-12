import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleNameChange = (event) => {
    console.log(`Name: ${event.target.value}`);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    console.log(`Phone: ${event.target.value}`);
    setNewPhone(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const copy = [...persons];
      copy.push({ name: newName, number: newPhone });
      setPersons(copy);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <h3 key={person.name}>
          {person.name} {person.number}
        </h3>
      ))}
    </div>
  );
};

export default App;
