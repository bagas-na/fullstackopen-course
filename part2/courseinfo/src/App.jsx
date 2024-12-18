const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
  <p>
    <strong>
      Total of {sum} exercise{Number(sum) > 1 ? "s" : ""}
    </strong>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
);

const Course = ({ course }) => {
  const { name, parts } = course;
  const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
      {
        name: "Form validation using zod",
        exercises: 17,
        id: 5,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
