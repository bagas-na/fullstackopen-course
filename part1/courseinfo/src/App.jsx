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
      <Part part={prop.part1} />
      <Part part={prop.part2} />
      <Part part={prop.part3} />
    </>
  );
};

const Total = (prop) => {

  return <p>Number of exercises {prop.part1.exercises + prop.part2.exercises + prop.part3.exercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  );
};

export default App;
