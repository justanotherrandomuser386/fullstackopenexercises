import { useState } from 'react'


const  Next  = ({handleSelected, range}) => {
  return (
      <button onClick={() => handleSelected(Math.floor(Math.random()*(range - 1)))}>next anecdote</button>
  )}

const Vote = ({handleVotes, votes, selected} ) => {
  const newvotes = [...votes]
  newvotes[selected] += 1
  return (
    <button onClick={() => handleVotes(newvotes)}>vote</button>
  )  
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.' 
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])  
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <Vote handleVotes={setVotes} votes={votes} selected={selected}/>
      <Next handleSelected={setSelected} range={anecdotes.length}/>

      <h1>Anecdote with most votes</h1>
      {anecdotes[( votes.indexOf(votes.reduce((a, b) => Math.max(a, b), -Infinity)) )]}<br/>
      has {votes.reduce((a, b) => Math.max(a, b), -Infinity)} votes
    </div>
  )
}

export default App
