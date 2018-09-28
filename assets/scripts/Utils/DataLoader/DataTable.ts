import * as DataClass  from "./DataClasses";

export default class DataTable {

    static ObjectPoolDT: DataClass.DataTable<DataClass.ObjectPoolDTItem>;
    static StageDT: DataClass.DataTable<DataClass.StageDTItem>;
    static MonsterDT: DataClass.DataTable<DataClass.MonsterDTItem>;
    static RefreshDT: DataClass.DataListTable<DataClass.RefreshDTItem>;

    /**
     *
     */
    constructor() {
        DataTable.ObjectPoolDT = new DataClass.DataTable<DataClass.ObjectPoolDTItem>();
        DataTable.StageDT = new DataClass.DataTable<DataClass.StageDTItem>();
        DataTable.MonsterDT = new DataClass.DataTable<DataClass.MonsterDTItem>();
        DataTable.RefreshDT = new DataClass.DataListTable<DataClass.RefreshDTItem>();
    }

}
