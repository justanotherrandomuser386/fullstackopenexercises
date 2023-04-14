const Persons = ({persons, filter}) => {
    return (
        <ul>
          {persons.filter((person) => {
             return filter === '' || person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ? true : false
          }).map((person) => {
            return <li key={person.id}>{person.name} {person.number}</li>
          })}
        </ul>
    )
}
export default Persons
