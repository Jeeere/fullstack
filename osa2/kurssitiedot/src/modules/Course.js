const Course = ({ courses }) => {
  console.log("Courses");
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ parts, courseId }) => {
  console.log("Content");
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        Number of exercises{" "}
        {parts.reduce((sum, part) => sum + part.exercises, 0)}
      </b>
    </p>
  );
};

export default Course;
