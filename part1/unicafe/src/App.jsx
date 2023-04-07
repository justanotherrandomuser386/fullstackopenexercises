import { useState } from 'react'

const Button = ({handleClick, name}) => {
  return (
    <button onClick = {handleClick}>{name}</button>
  )
}

const StatisticLine = ({label, value}) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  const average = all != 0  ? (good - bad) / all : 0
  const positive = all != 0 ? 100*good/all : 0
 
  if (all == 0)
    return (
      <div>
        <h1>statistics</h1>      
        {'No feedback given'}
      </div>
    )
  else
    return (
      <>
        <h1>statistics</h1>      
        <table>
          <tbody>
            <StatisticLine label={'good'} value={good}/>
            <StatisticLine label={'neutral'} value={neutral}/>
            <StatisticLine label={'bad'} value={bad}/>
            <StatisticLine label={'all'} value={all}/>
            <StatisticLine label={'average'} value={average}/>
            <StatisticLine label={'positive'} value={positive}/>
          </tbody>  
        </table>
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
