import { action, makeAutoObservable, observable } from "mobx";
import axios from "axios";

class Users {
  users = [];

  constructor() {
    makeAutoObservable(this, {
        users: observable,
        fetchUsers : action
    });
  }

  fetchUsers() {
    axios
      .get("http://127.0.0.1:3001/getUsers")
      .then((response) => (this.users = response.data))
      .catch((err) =>
        console.log("There was an error fetching the data!", err)
      );
  }
 
}

const usersModel = new Users();
export default usersModel;
