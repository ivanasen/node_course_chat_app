let users = [];

let addUser = (id, name, room) => {
    users.push({});
};

class Users {
    constructor() {
        this.users = [];
    }

    add(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    get(id) {
        return this.users.find(user => user.id === id);
    }

    remove(id) {
        const user = this.get(id);
        if (user) {
            this.users.splice(this.users.indexOf(user), 1);
        }        
        return user;
    }

    getAllInRoom(room) {
        const usersInRoom = this.users.filter(user => user.room === room);
        const userNames = usersInRoom.map(user => user.name);
        return userNames;
    }
}

module.exports = {Users}