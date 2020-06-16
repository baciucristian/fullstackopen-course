import React from 'react';

const Header = ({course}) => {
  return (
    <>
      <h2>{course.name}</h2>
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

export default Course;
