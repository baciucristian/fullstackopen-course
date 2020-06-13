import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({text, value}) => <p>{text + ' ' + value}</p>;

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + neutral + bad;
  let average = (good * 1 + neutral * 0 + bad * -1) / all;
  let positivePercentage = (good / all) * 100;

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
      <Statistic text="good" value={good}></Statistic>
      <Statistic text="neutral" value={neutral}></Statistic>
      <Statistic text="bad" value={bad}></Statistic>
      <Statistic text="all" value={all}></Statistic>
      <Statistic text="average" value={average}></Statistic>
      <Statistic text="positive" value={positivePercentage + ' %'}></Statistic>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
