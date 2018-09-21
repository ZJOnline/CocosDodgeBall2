import { ObjectPool } from "./DataClasses";

export default class DataTable {

    static ObjectPoolDT: ObjectPool;

    /**
     *
     */
    constructor() {
        DataTable.ObjectPoolDT = new ObjectPool();
    }

}
