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
  return (
    <div>
      <Button handleClick={ () => {setGood(good + 1)} } name='good'/>
      <Button handleClick={ () => {setNeutral(neutral + 1)} } name='good'/>
      <Button handleClick={ () => {setBad(bad + 1)} } name='good'/>

      <Display label={'good'} value={good}/>
      <Display label={'neutral'} value={neutral}/>
      <Display label={'bad'} value={bad}/>
    </div>
  )
}

export default App
