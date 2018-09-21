import { ObjectPool } from "./DataClasses";
import DataTable from "./DataTable";

export default class JsonReader {

    objectPoolDT: ObjectPool;
    /**
     *
     */
    constructor() {
        this.load();
        new DataTable();
    }

    load () {
        cc.loader.loadRes("Data/GameJsonData", (err, res) => {
            this.dataParse(res.json);
        });
    }

    dataParse(json: any) {
        let array = json;

        DataTable.ObjectPoolDT.ObjectPool = array["ObjectPool"];
    }
}
