import { action, makeAutoObservable, observable } from "mobx";
import axios from "axios";

class AquastatsData {
  aquastatsdata = [];

  constructor() {
    makeAutoObservable(this, {
      aquastatsdata: observable,
      fetchData: action,
    });
  }

  fetchData() {
    axios
      .get("http://127.0.0.1:3001/api/aquastats/getData")
      .then((response) => (this.aquastatsdata = response.data))
      .catch((err) =>
        console.log("There was an error fetching the data!", err)
      );
  }
}

const dataModel = new AquastatsData ();
export default dataModel;
