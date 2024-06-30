import { action, makeAutoObservable, observable } from "mobx";
import { getAquaStat, getRealtime } from "api/aquaStats";
import { makePersistable } from "mobx-persist-store";

class AquastatsData {
  aquastats = [];
  realtimeData = { temperature: 0, pressure: 0, time: "", date: "" };

  constructor() {
    makeAutoObservable(this, {
      aquastats: observable,
      realtimeData: observable,
      fetchData: action.bound,
      fetchRealtimeData: action.bound,
    });
    makePersistable(this, { name: "store", properties: ["realtimeData"], storage: window.localStorage });
    setInterval(this.fetchRealtimeData, 5000);
  }

  async fetchData() {
    const response = await getAquaStat();
    this.aquastats = response;
  }

  async fetchRealtimeData() {
    const response = await getRealtime();
    if (response.length != 0) this.realtimeData = response[response.length - 1];
  }
  
}

const dataModel = new AquastatsData();
export default dataModel;
