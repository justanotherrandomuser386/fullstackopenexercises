import { graphql } from 'relay-runtime'

const PersonFragment = graphql`
  fragment PersonFragment_person on Person @relay(plural: true) {
    name,
    phone,
    address {
      street, 
      city
    }
    id
  }
`

const Person = ({ person, onClose }) => {
  console.log('person', person) 
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

export default Person
export { PersonFragment }
