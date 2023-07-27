import Http from "tools/Http";

export class Users {

  static usersList;
  static usersDict;
  static user;
  static loadedUser;
  
  static async fetchUsers() {
    if (!this.usersList) {
      const unsorted = await Http.getAllUsers();
      this.usersList = unsorted.sort((a, b) => a.name.localeCompare(b.name));
      this.usersDict = this.usersList.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
    }
  }

  static loadUser() {
    if (!this.loadedUser) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.loadedUser = true;
    }
  }

  static async getUserDict() {
    await this.fetchUsers();

    return this.usersDict;
  }

  static getUsersFromIds(ids) {
    return ids.map((id) => this.usersDict[id]).sort((a, b) => a.name.localeCompare(b.name));
  }

  static async getActiveUsers() {
    await this.fetchUsers();

    return this.usersList.filter((user) => user.level >= 1);
  }

  static setUser(user) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }    
    this.user = user;
  }

  static getUser() {
    this.loadUser();
    return this.user;
  }

  static isAdmin() {
    this.loadUser();
    return this.user && this.user.level >= 2;
  }
}

