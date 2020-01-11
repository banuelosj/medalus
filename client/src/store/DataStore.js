import { action, observable, decorate } from "mobx"

class DataStore {
    county = '';
    where = '';
    inputGeometry = '';
    outFields = '';
    returnGeometry = '';


    setCounty(x) {
        this.county = x;
    }
    setWhere(x) {
        this.where = x;
    }
    setInputGeometry(x) {
        this.inputGeometry = x;
    }
    setOutFields(x) {
        this.outFields = x;
    }
    setReturGeometry(x) {
        this.returnGeometry = x;
    }
}


decorate(DataStore, {
    county: observable,
    where: observable,
    inputGeometry: observable,
    outFields: observable,
    returnGeometry: observable,
    setCounty: action,
    setWhere: action,
    setInputGeometry: action,
    setOutFields: action,
    setReturGeometry: action
})

export default new DataStore()