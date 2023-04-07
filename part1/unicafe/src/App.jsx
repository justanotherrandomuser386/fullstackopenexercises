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

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + bad + neutral
  let average = all != 0  ? (good - bad) / all : 0
  let positive = all != 0 ? 100*good/all : 0
  return (
    <div>
      <Button handleClick={ () => {setGood(good + 1)} } name='good'/>
      <Button handleClick={ () => {setNeutral(neutral + 1)} } name='neutral'/>
      <Button handleClick={ () => {setBad(bad + 1)} } name='bad'/>

      <Display label={'good'} value={good}/>
      <Display label={'neutral'} value={neutral}/>
      <Display label={'bad'} value={bad}/>
      <Display label={'all'} value={all}/>
      <Display label={'average'} value={average}/>
      <Display label={'positive'} value={positive}/>
    </div>
  )
}

export default App
