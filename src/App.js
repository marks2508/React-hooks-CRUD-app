import React, { useState} from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

const App = () => {

  // this is the data for the app
  const usersData = [
    { id: 1, name: 'Mark', username: 'clown' },
    { id: 2, name: 'Mike', username: 'michael' },
    { id: 3, name: 'Edward', username: 'eagle' },
    { id: 4, name: 'Elliot', username: 'el dog'}
  ]

  const initialFormState = { id: null, name: "", username: "" }

  // state

  const [ users, setUsers ] = useState(usersData)
  const [ editing, setEditing ] = useState(false)
  const [ currentUser, setCurrentUser ] = useState(initialFormState)

  // crud functions

  const addUser = user => {
    user.id = users.length + 1
    setUsers([ ...users, user ])
  }

  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id ))
  }

  const editRow = user => {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  const updateUser = (id, updateUser) => {
    setEditing(false)
    setUsers(users.map(user => (user.id === id ? updateUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
         {editing ? (
           <div>
            <h2>Edit user</h2>
            <EditUserForm
              editing={editing}
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser}
            />
          </div>
        ) : (
          <div>
            <h2>Add User</h2>
            <AddUserForm addUser={addUser} />
          </div>
        )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App;
