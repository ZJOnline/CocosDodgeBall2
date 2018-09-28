import * as DataClass from "./DataClasses";
import DataTable from "./DataTable";

export default class JsonReader {

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
        //TODO:配置文件加密解密
        DataTable.ObjectPoolDT.DataTable = array["ObjectPool"];
        DataTable.StageDT.DataTable = array["Stage"];
        DataTable.RefreshDT.DataTable = array["Refresh"];
        DataTable.MonsterDT.DataTable = array["Monster"];
    }
}
