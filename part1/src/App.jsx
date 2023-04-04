import React from "react";

const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Content = ( parts ) => {
  const children = []
  console.log('Enter Content')
  parts.parts.forEach(element => {
    const p = React.createElement('p', {}, element.name, ' ', element.exercises)
    children.push(p)
    console.log(p)
  });
  const parent = React.createElement('div', {}, children)
  return parent
 }

const Total = ( parts ) => {
  let total = 0 
  parts.parts.forEach(element =>{
    total += element.exercises
  })
    return (
      <p>Number of exercises {total}</p>    
    )
}


const App = () => {
  const course = 'Half stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  const parts = [{'name':part1, 'exercises':exercises1}, {'name':part2, 'exercises':exercises2}, {'name':part3, 'exercises':exercises3}]

  return (
    <div>
    <Header name = {course} />
    <Content parts = { parts } />
    <Total parts = {parts} />
   </div>
  )
}


export default App
