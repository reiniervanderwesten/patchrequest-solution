import { useEffect, useState } from "react";
import { UserDetail } from "./UserDetail";
import { UserForm } from "./UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const friends = await response.json();
      setUsers(friends);
    };
    fetchUsers();
  }, []);

  const createUser = async user => {
    // No error handling, normally you would do that.
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
    user.id = (await response.json()).id;
    setUsers(users.concat(user));
  };

  const destroyUser=async ()=>{
		const response= await fetch('http://localhost:3000/users/4',{
			method: "DELETE",
			headers: {"Content-Type": "application/json;charset=utf-8"},
		});
		const vrienden= await response.json();
		setUsers(vrienden.filter(vriend => vriend.id !== 4))    

	
	}

  const changeUser = async () => {
    const response = await fetch("http://localhost:3000/users/3", {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ name: naampje }),
    });
  
    const vijand = await response.json();
    console.log("vijandnaam:", vijand.name);
    console.log("users:", users);
  
    const newBooks = users.map((user) => {
      console.log("userID:", user.id);
      console.log("Username:", user.name);
      console.log("user met nieuwe naam:", vijand.name);
  
      if (user.id === 3) {
        return { ...user, name: vijand.name };
      }
      return user;
    });




  return (
    <div className="App">
      <h1>React Hooks exercise starter</h1>
      <UserForm createUser={createUser} />
      <ul>
        {users.map(user => (
          <li onClick={() => setSelectedUser(user)} key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUser && <UserDetail user={selectedUser} />}
      <button onClick={()=>destroyUser()}>test destroy user</button>
      <button onClick={()=>changeUser()}>change user</button>

    </div>
  );
};

export default App;
