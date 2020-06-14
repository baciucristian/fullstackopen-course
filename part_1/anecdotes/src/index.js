import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const App = props => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

  const indexOfMaxPoints = points.indexOf(Math.max(...points));

  const handleVoteClick = () => {
    const copyOfPoints = [...points];
    copyOfPoints[selected] += 1;
    setPoints(copyOfPoints);
  };

  const handleAnecdoteClick = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    setSelected(randomNumber);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {String(points[selected])} votes</div>
      <Button handleClick={handleVoteClick} text="vote"></Button>
      <Button handleClick={handleAnecdoteClick} text="next anecdote"></Button>

      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[indexOfMaxPoints]}</div>
      <div>has {String(points[indexOfMaxPoints])} votes</div>
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
