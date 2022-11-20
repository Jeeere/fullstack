const Numbers = ({ filteredPersons, handleDelete }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <h3 key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </h3>
      ))}
    </div>
  );
};

export default Numbers;
