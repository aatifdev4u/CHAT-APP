const users = []; //List of usrs

const addUser = ({ id, name, room })=>{
    // change the name to lowecase
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // check username already exist , user is trying to login
    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser){
        return { error: 'Username is already exist'}
    }

    const user = { id, name, room };

    users.push(user);

    return { user }
}

const removeUser = ({ id })=>{
    // find user with that specific Id
    const index = users.findIndex((user)=> used.id === id );

    if(index !== -1){
        users.splice(index, 1)[0];
    }

}

const getUser = (id)=> users.find((user)=> user.id === id);

// get users in Specific room
const getUsersInRoom = (room)=> users.filter((user) => user.room === room);

module.exports = {
    addUser,
    getUsersInRoom,
    removeUser,
    getUser
}