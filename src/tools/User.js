
export class User {

  static user;
  static loadedUser;

  static loadUser() {
    if (!this.loadedUser) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.loadedUser = true;
    }
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

