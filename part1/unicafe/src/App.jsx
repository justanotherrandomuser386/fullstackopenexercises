import { useState } from 'react'

const Button = ({handleClick, name}) => {
  return (
    <button onClick = {handleClick}>{name}</button>
  )
}

const Display = ({label, value}) => {
  return (
    <div>
      <label>{label}</label> {value}
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  const average = all != 0  ? (good - bad) / all : 0
  const positive = all != 0 ? 100*good/all : 0
 
  if (all == 0)
    return (
      <>
        <h1>statistics</h1>
        <div>
          No feedback given
        </div>
      </>
    )
  else
    return (
      <>
        <h1>statistics</h1>
        <Display label={'good'} value={good}/>
        <Display label={'neutral'} value={neutral}/>
        <Display label={'bad'} value={bad}/>
        <Display label={'all'} value={all}/>
        <Display label={'average'} value={average}/>
        <Display label={'positive'} value={positive}/>
      </>
  )
   }

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={ () => {setGood(good + 1)} } name='good'/>
      <Button handleClick={ () => {setNeutral(neutral + 1)} } name='neutral'/>
      <Button handleClick={ () => {setBad(bad + 1)} } name='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
