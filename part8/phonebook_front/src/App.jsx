import { graphql } from 'relay-runtime'
import { createFragmentContainer, useFragment, useLazyLoadQuery, useMutation, useQueryLoader, useRelayEnvironment } from 'react-relay'
import PersonForm from './components/PersonForm'
import Persons from './components/PersonsList'
import { PhonebookQuery } from './components/PersonsList'
import { useState } from 'react'


function App() {
  const [refresh, setRefresh] = useState()

  return (
    <div>
      <Persons refresh={refresh}/>
      <PersonForm refresh={setRefresh}/>
    </div>
  )
}

export default App
