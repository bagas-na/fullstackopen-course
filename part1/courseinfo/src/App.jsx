const Header = (prop) => {
  return <h1>{prop.course}</h1>;
};

const Part = (prop) => {
  const name = prop.part.name;
  const exercises = prop.part.exercises;
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = (prop) => {
  return (
    <>
      <Part part={prop.parts[0]} />
      <Part part={prop.parts[1]} />
      <Part part={prop.parts[2]} />
    </>
  );
};

const Total = (prop) => {

  return <p>Number of exercises {prop.parts[0].exercises + prop.parts[1].exercises + prop.parts[2].exercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
