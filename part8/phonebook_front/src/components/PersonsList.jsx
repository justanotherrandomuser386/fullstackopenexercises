import Person from './Person'
import { createFragmentContainer, useLazyLoadQuery } from 'react-relay'
import { useFragment, usePreloadedQuery } from 'react-relay'
import { useState } from 'react'
import { PersonFragment } from './Person'

const PhonebookQuery = graphql`
  query PersonsListQuery {
    allPersons {
    name,
    phone,
    address {
      street, 
      city
    }
    id
    }
  }
`

const Persons = () => {

  const data = useLazyLoadQuery(
    PhonebookQuery,
    {}, 
    {
      fetchPolicy:'network-only',
    }).allPersons
  const [nameToSearch, setNameToSearch] = useState(null)
  console.log(data)
  if (nameToSearch) {
    return (
      <Person
        person={data.find(person => person.name === nameToSearch)}
        onClose={() => setNameToSearch(null)}
      />
    )
  }
  console.log('rerender list')
  return (
    <div>
      <h2>Persons</h2>
      {data.map(p => 
        <div key={p.id}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            show address
          </button>
        </div>

      )}
    </div>
  )
}

export default Persons
export { PhonebookQuery }
