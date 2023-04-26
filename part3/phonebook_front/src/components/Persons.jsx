import phones from "../services/phones"

const Persons = ({persons, filter, deletePhone}) => {
    return (
        <ul>
          {persons.filter((person) => {
             return filter === '' || person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ? true : false
          }).map((person) => {
            return <li key={person.id}>{person.name} {person.number} <button onClick = {() => deletePhone(person.id, person.name)}>delete</button></li>
          })}
        </ul>
    )
}
export default Persons
