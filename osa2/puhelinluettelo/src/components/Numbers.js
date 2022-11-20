const Numbers = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <h3 key={person.name}>
          {person.name} {person.number}
        </h3>
      ))}
    </div>
  );
};

export default Numbers;
