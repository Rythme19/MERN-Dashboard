import { action, makeAutoObservable, observable } from "mobx";
import axios from "axios";

class Data {
  data = [];

  constructor() {
    makeAutoObservable(this, {
      data: observable,
      fetchData: action,
    });
  }

  fetchData() {
    axios
      .get("http://127.0.0.1:3001/getData")
      .then((response) => (this.data = response.data))
      .catch((err) =>
        console.log("There was an error fetching the data!", err)
      );
  }
}

const dataModel = new Data();
export default dataModel;
