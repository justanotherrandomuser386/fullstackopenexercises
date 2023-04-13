const Header = ({ course }) => {
  return (
    <>
      <h2>{course.name}</h2>
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

export default Course
