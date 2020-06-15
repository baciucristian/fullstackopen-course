import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({course}) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  );
};

const Part = ({part, exercises}) => {
  return (
    <>
      <p>
        {part} {exercises}
      </p>
    </>
  );
};

const Content = ({course}) => {
  return (
    <>
      {course.parts.map(part => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = ({course}) => {
  const all = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <b>total of {all} exercises</b>
    </>
  );
};

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
