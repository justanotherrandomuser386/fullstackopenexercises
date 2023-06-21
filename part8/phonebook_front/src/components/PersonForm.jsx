import { useState } from 'react'
import { graphql } from 'relay-runtime'
import { useFragment, useMutation } from 'react-relay'

const CREATE_PERSON = graphql`
  mutation PersonFormCreatePesonMutation($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
        ...PersonFragment_person
    }
    
  }
`

const PersonForm = ({ refresh }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [commitMutation, isMutationInFlight] = useMutation(CREATE_PERSON)

  const submit = (event) => {
    event.preventDefault()

    commitMutation({ 
      variables: { name, phone, street, city },
      updater: (store, response) => {
        console.log('store', store)
        console.log('response', response)
        refresh(response.addPerson.__id)
      }
    })

    setName('')
    setPhone('')
    setCity('')
    setStreet('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default PersonForm
