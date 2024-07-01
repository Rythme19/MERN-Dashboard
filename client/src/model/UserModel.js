import { action, makeAutoObservable, observable } from "mobx";
import { getUsers,deleteUsers,updateRole,updateUser} from "../api/users";
import { getRoles } from "api/roles";

class Users {
  users = [];
  roles = [];

  constructor() {
    makeAutoObservable(this, {
      users: observable,
      roles: observable,
      fetchUsers: action.bound,
      fetchRoles: action.bound,
      updateRole: action.bound,
      deleteUsers: action.bound,
      updateUser: action.bound,
    });
    this.fetchRoles();
  }

  fetchUsers = async () => {
    try {
      const response = await getUsers();
      this.users = response;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    console.log(this.users);
  };

  fetchRoles = async () => {
    try {
      const response = await getRoles();
      this.roles = response;
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
    console.log(this.roles);
  }

  updateRole = async (id, newRole) => {
    updateRole(id, newRole);
  }


  updateUser = async (id, updatedUser) => {
    try {
      await updateUser(id, updatedUser);
      this.fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  deleteUsers = async (ids) => {
    try {
      await deleteUsers(ids);
      this.fetchUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    console.log(this.users);
  }
}

const usersModel = new Users();
export default usersModel;
