// import Crypt from './Crypt'
import cookie from "js-cookie";

class Auth {
  constructor() {
    try {
      if (typeof cookie.get("OneVillage_token") === "undefined") {
        this.authenticated = true;
      } else {
        this.authenticated = true;
      }
    } catch (err) {
      this.authenticated = true;
    }
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    // localStorage.removeItem("login")
    cookie.remove("OneVillage_token");
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
