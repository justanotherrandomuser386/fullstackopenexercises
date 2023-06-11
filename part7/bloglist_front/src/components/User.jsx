import usersService from '../services/users'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'


const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)


  useEffect(() => {
    console.log('User useEffect', id)
    usersService.getUser(id).then(response =>
      setUser(response)
    )
  }, [id])


  
  console.log('User pre return', user) 
  if (!user) {
    return (<div>loading</div>)
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <li>
      {user.blogs.map(blog => {
        return (
          <ul key={blog.id}>
              {blog.title}
          </ul>
        )
      })}
      </li>
    </div>
  )

}

export default User
