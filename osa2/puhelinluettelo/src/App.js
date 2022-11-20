import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import Numbers from "./components/Numbers";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

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
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then((response) => {
        // Filter removed contact from list
        const personRemoved = persons.filter((person) => person.id !== id);
        setPersons(personRemoved);
        // Refilter
        const personRemovedFiltered = filteredPersons.filter(
          (person) => person.id !== id
        );
        setFilteredPersons(personRemovedFiltered);
      });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    // Get contacts with same name
    const match = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (match !== 0) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(match[0].id, { name: match[0].name, number: newPhone })
          .then((response) => {
            // Replace old number with new
            const newPersons = persons.map((person) =>
              person.id === response.data.id ? response.data : person
            );
            setPersons(newPersons);
            // Refilter
            const newPersonsFiltered = newPersons.filter((person) =>
              person.name.toLowerCase().includes(newFilter.toLowerCase())
            );
            setFilteredPersons(newPersonsFiltered);
            // Empty input fields
            setNewName("");
            setNewPhone("");
          });
      }
    } else {
      personService
        .create({ name: newName, number: newPhone })
        .then((response) => {
          // Add new contact information
          const newPersons = persons.concat(response.data);
          setPersons(newPersons);
          // Refilter
          const newPersonsFiltered = newPersons.filter((person) =>
            person.name.toLowerCase().includes(newFilter.toLowerCase())
          );
          setFilteredPersons(newPersonsFiltered);
          // Empty input fields
          setNewName("");
          setNewPhone("");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new contact</h2>
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Numbers filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
