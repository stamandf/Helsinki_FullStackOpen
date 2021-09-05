import { useState } from 'react';
import './App.css';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)
const StatisticsLine = ({text, value, char}) => (
  <>
   <tr>
      <td>{text}:</td>
      <td>{value} {char}</td>
    </tr>
  </>
)
const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad;
  if (total > 0) {
    return (
        <table>
          <tbody>
            <StatisticsLine text={'Good'} value={good}/>
            <StatisticsLine text={'Neutral'} value={neutral}/>
            <StatisticsLine text={'Bad'} value={bad}/>
            <StatisticsLine text={'All'} value={good + neutral + bad}/>
            <StatisticsLine text={'Average'} value={(total) / 3}/>
            <StatisticsLine text={'Positive'} value={total > 0 ? (good / total) * 100 : 0} char={'%'}/>
          </tbody>
        </table>
    )
  } else {
    return (
      <div>
        No Feedback given
      </div>
    )
  }
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [max, setMax] = useState(0);
  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);
  const resetAll = () => {
    setGood(0);
    setNeutral(0);
    setBad(0);
  }
  const anecdote = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The best way to get a project done faster is to start sooner',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Good code is its own best documentation. As you’re about to add a comment, ask yourself, ‘How can I improve the code so that this comment isn’t needed?’ Improve the code and then document it to make it even clearer.',
    'It\'s OK to figure out murder mysteries, but you shouldn\'t need to figure out code. You should be able to read it.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const getSelected = () => {
    let max = anecdote.length-1;
    let idx = Math.floor(Math.random() * max);
    setSelected(idx);
  }
  const [points, setPoints] = useState(Array(anecdote.length).fill(0));
  
  const findMax = (array) => {
    return Math.max(...array);
  }
  const updateVote = () => {
    const copy = [...points];
    copy[selected] +=1;
    setPoints(copy);
    let maxVotes = findMax(copy);
    const isMaxVotes = (element) => element === maxVotes;  
    let index = copy.findIndex(isMaxVotes);
    setMax(index);
  }
  
  return (
    <div>
       <h1>Give Feedback</h1>
       <Button handleClick={increaseGood} text={'Good'} />
       <Button handleClick={increaseNeutral} text={'Neutral'} />
       <Button handleClick={increaseBad} text={'Bad'} />
       <Button handleClick={resetAll} text={'Reset All'} />
       <h2>Statistics</h2>
       <Statistics good={good} neutral = {neutral} bad={bad} />
       <p>
       <Button handleClick={updateVote} text={'Vote'} />
       <Button handleClick={getSelected} text={'Next Anecdote'} />
       </p>
       <div>
       <p>
         {anecdote[selected]}
       </p>
       <h2> Anecdote with most votes</h2>
       <p>{anecdote[max]}</p>
       </div>
    </div>
  );
}

export default App;
