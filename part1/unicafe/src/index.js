import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const Total = ({text, value}) => <p>{text + ' ' + value}</p>;

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"></Button>
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text="neutral"
      ></Button>
      <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>

      <h1>Statistics</h1>
      <Total text="good" value={good}></Total>
      <Total text="neutral" value={neutral}></Total>
      <Total text="bad" value={bad}></Total>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
