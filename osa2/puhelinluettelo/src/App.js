import { useState } from "react";
import Filter from "./components/Filter"
import AddPersonForm from "./components/AddPersonForm"
import Numbers from "./components/Numbers"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  const handleNameChange = (event) => {
    // console.log(`Name: ${event.target.value}`);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    // console.log(`Phone: ${event.target.value}`);
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    // console.log(`Filter: ${event.target.value}`);
    setFilteredPersons(
      persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    );
  };

  const addPerson = (event) => {
    event.preventDefault();
    // console.log("button clicked", event.target);
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
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new contact</h2>
      <AddPersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Numbers filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
