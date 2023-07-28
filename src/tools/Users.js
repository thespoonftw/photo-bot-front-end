
export class Users {

  constructor(users) {
    this.usersList = users.sort((a, b) => a.name.localeCompare(b.name));
    this.usersDict = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});
  }

  getUserFromId(id) {
    return this.usersDict[id];
  }

  getUsersFromIds(ids) {
    return ids.map((id) => this.usersDict[id]).sort((a, b) => a.name.localeCompare(b.name));
  }

  getActive() {
    return this.usersList.filter((user) => user.level >= 1);
  }
  
}

