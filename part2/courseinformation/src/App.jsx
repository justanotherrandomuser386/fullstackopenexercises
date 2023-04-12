import React from "react";

const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}


const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part key = {part.id} part={part}/>)}
    </div>
  )  
}

const Total = ({ course }) => {
    const total = course.parts.reduce((previous, current) => {
      return previous + current.exercises
    }, 0)
    return (
      <b>
        total of {total} 
      </b>    
    )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course = {course} />
      <Content  course = {course} />
      <Total course = {course}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1, 
    name: 'Half stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10,
      id: 1
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
      id: 2
    },
    {
      name: 'State of a component',
      exercises: 14,
      id: 3
    },
    {
      name: 'Redux',
      exercises: 11,
      id: 4
    }]
  }

  return <Course course={course}/>
  
}


export default App
